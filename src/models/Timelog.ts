type Timelog = {
    ID?: string;
    Start: Date;
    Stop?: Date;
    Reason: string;
    Location: string;
    CreatedAt?: Date;
    ModifiedAt?: Date;
};

export default Timelog;
