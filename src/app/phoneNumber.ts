export interface phoneNumber{

    id:number;
    valid: boolean ;
    local_format: string;
    intI_format: string;
    country_code:string;
    country_name: string;
    location: string;
    carrier:string;
    line_type:string;

}