import { registerEnumType } from "@nestjs/graphql";

export enum ErrorStrings{
    DUPLICATE_EMAIL,
    EMAIL_DOESNT_EXISTS,
    COMPANY_DOESNT_EXIST,
    INVALID_INVITE_CODE,
    NONE,
}

registerEnumType(ErrorStrings,{
    name:'ErrorStrings',
})