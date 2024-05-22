import dynamic from 'next/dynamic';

const View = dynamic(() => import('./view'), { ssr: false });

export default function session() {
    return (
        <>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <h1>Welcome to the live sessions !</h1> */}
                <View />
            </main>
        </>
    );
}