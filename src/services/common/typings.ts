export type DictType =
    | 'identity'
    | 'dreamStatus'
    | 'load'
    | 'purpose'
    | 'stage'
    | 'projectStage'
    | 'projectLabel';
export type DictData = {
    configuration: any;
    description: string;
    id: number;
    key: string;
    value: string;
};
export type UploadData = {
    id: number;
    type: string;
    contentType: string;
    ext: string;
    hash: string;
    url: string;
    src: string;
    imageThumb: string;
    imageWidth: number;
    imageHeight: number;
    mediaLong: string;
    size: string;
    createAt: string;
    updateAt: string;
    fileName: string;
    recordId: number;
};
