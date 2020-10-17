interface MaoYanFilmPicture {
    url: string;
    imageList: ImageItem[];
    selector: string;
    attr: string;
    target: string;
    handleSrc: (string: string) => string;
    handleName: (src: string) => string;
    bagpipe: any;
}
interface ImageItem {
    src: string;
    name: string;
}
interface Options {
    url: string;
    selector: string;
    attr: string;
    timeout: number;
    target: string;
    handleSrc: (string: string) => string;
    handleName: (src: string) => string;
}
declare class MaoYanFilmPicture {
    constructor({ url, selector, attr, timeout, target, handleSrc, handleName }: Options);
    start(): void;
    download(src: string, name: string, dest: string): void;
    handleRequest(err: Error, res: any, body: string): void;
}
export default MaoYanFilmPicture;
