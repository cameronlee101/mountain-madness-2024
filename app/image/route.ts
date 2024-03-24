import { NextResponse } from "next/server";

type Params = {
	url: string;
};

async function streamToBuffer(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

export async function GET(request: Request) {
    // console.log('abcef', request);
    const info = request.url.split("?")[1];
    const url = decodeURIComponent(info.split('=')[1]);
    // console.log('2theurl', decodeURIComponent(url));

	const response = await fetch(url);

    const buffer = await streamToBuffer(response.body);

    const base64data = buffer.toString('base64');
    const data = `data:image/jpeg;base64,${base64data}`;

    return NextResponse.json({ message: data }, { status: 200 });

    // const blob = await response.blob();
    
    // console.log('blob', blob);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //     let base64data = reader.result;
    //     if (typeof base64data !== "string") {
    //         return;
    //     }
    //     base64data = base64data.replace(
    //         "data:application/octet-stream;base64,",
    //         ""
    //     );
    //     if (typeof base64data !== "string") {
    //         return;
    //     }
    //     const data = base64data;
    //     return NextResponse.json({ message: data }, { status: 200 });
    // };
    // reader.readAsDataURL(blob);
}
