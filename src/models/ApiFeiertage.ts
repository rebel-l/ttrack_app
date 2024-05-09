export type ApiFeiertag = {
    all_states: string;
    augsburg?: string;
    bb: string;
    be: string;
    bw: string;
    by: string;
    hb: string;
    he: string;
    hh: string;
    mv: string;
    ni: string;
    nw: string;
    rp: string;
    sh: string;
    sl: string;
    sn: string;
    st: string;
    th: string;
    comment: string;
    date: Date;
    fname: string;
    katholisch?: string;
};

export type ApiFeiertage = ApiFeiertag[];

export type ApiFeiertageResponse = {
  feiertage: ApiFeiertage;
  status: string
};
