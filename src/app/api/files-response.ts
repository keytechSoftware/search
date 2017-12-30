
    export class FilesResponse {
        constructor(
            public FileInfos: FileInfo[]
            ){}
    };

    export class FileInfo {
        constructor(
            public ElementKey: string,
            public FileCharset: string,
            public FileDisplayname: string,
            public FileID: number,
            public FileLastChangedAt: Date,
            public FileMimeType: string,
            public FileName: string,
            public FilePageCount: number,
            public FileResolution: string,
            public FileSize: number,
            public FileStorageType: string,
            public KeyValueList: any[]
        ){}
    };

