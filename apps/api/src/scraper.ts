import axios from "axios";

type Course = {
  crn: string; // Course Registration Number
  type: string; // Schedule type (Lecture, Recitation, Lab)
  code: string; // Subject + Number (MTH254, CS162)
  title: string; // Course title (Data Structures, Web Development)
  professor: string; // Professor name
};

type SearchParams = {
  txt_term: string; // 202403 = Spring 2024
  pageOffset: number;
  pageMaxSize: number; // Max is 500
  txt_campus?: string; // "C" = Corvallis Campus
};

type SearchResult = {
  totalCount: number;
  courses: Course[];
};

class CourseScraper {
  private axiosInstance = axios.create({
    baseURL:
      "https://prodapps.isadm.oregonstate.edu/StudentRegistrationSsb/ssb/",
    withCredentials: true,
  });

  private async getSession(term: string): Promise<string> {
    const res = await this.axiosInstance.post(
      "term/search?mode=search",
      { term: term },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.headers["set-cookie"]?.join("; ") || "";
  }

  public async getCourses(term: string): Promise<Course[]> {
    const cookies = await this.getSession(term);

    const pageMax = 500;

    const initialSearch = await this.search(cookies, {
      pageOffset: 0,
      pageMaxSize: pageMax,
      txt_term: term,
    });
    const courses: Course[] = initialSearch.courses;

    const pool: Promise<SearchResult>[] = [];
    for (
      let offset = pageMax;
      offset < initialSearch.totalCount;
      offset += pageMax
    ) {
      pool.push(
        this.search(cookies, {
          pageOffset: 0,
          pageMaxSize: pageMax,
          txt_term: term,
        })
      );
    }
    const results = await Promise.all(pool);

    for (const result of results) {
      for (const course of result.courses) {
        courses.push(course);
      }
    }

    return courses;
  }

  private async search(
    cookies: string,
    params: SearchParams
  ): Promise<SearchResult> {
    const res = await this.axiosInstance.get("searchResults/searchResults", {
      params: params,
      headers: { Cookie: cookies },
    });
    return {
      totalCount: res.data.totalCount,
      courses: res.data.data.map((courseData: any) =>
        this.normalizeCourse(courseData)
      ),
    };
  }

  private normalizeCourse(courseData: any): Course {
    const professorName: string =
      courseData.faculty.find((instructor: any) => instructor.primaryIndicator)
        ?.displayName || "";

    return {
      crn: courseData.courseReferenceNumber,
      type: courseData.scheduleTypeDescription,
      code: courseData.subjectCourse,
      title: courseData.courseTitle,
      professor: professorName,
    };
  }
}

const scraper = new CourseScraper();
export default scraper;
