export class ElementList {
    constructor(
        public Key: string,
        public KeyValueList: any[],
        public BreadCrumbList: any [],
        public Name: string,
        public DisplayName: string,
        public ClassDisplayName: string,
        public Version: string,
        public Status: string,
        public Description: string,
        public CreatedAt: Date,
        public CreatedBy: string,
        public CreatedByLong: string,
        public ChangedAt: Date,
        public ChangedBy: string,
        public ChangedByLong: string,
        public ReleasedAt: Date,
        public ReleasedBy: string,
        public ReleasedByLong: string,
        public ThumbnailHint: string,
        public HasVersions: boolean,

        // Mail&Task specific attributes
        public Subject: string,
        public PriorityDisplayText: string,
        public CategoryDisplayText: string,
        public Sender: string,
        public Recipient: string,
        public TransportDate: Date,

        // Task specific attributes
        public OwnerLong: string,
        public CompletedPercent: number,
        public PlannedStart: Date,
        public PlannedEnd: Date,
        public TaskStatusDisplayText: string

    ){}
}