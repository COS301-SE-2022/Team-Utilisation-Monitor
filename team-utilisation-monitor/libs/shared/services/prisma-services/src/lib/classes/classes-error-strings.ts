import { registerEnumType } from "@nestjs/graphql";

export enum ErrorStrings{
    DUPLICATE_EMAIL,
    EMAIL_DOESNT_EXISTS,
    COMPANY_DOESNT_EXIST,
    INVALID_INVITE_CODE,
    NONE,
    USER_DOESNT_EXIST,
    PRISMA_CREATE_FAIL,
    PRISMA_UPDATE_FAIL,
    PRISMA_DELETE_FAIL,
    DUPLICATE_POSITION,
    DUPLICATE_SKILL,
    UNDEFINED,
    PRISMA_QUERY_FAILED,
    NO_POSITIONS_FOUND,
    NO_SKILLS_FOUND,
    
}

registerEnumType(ErrorStrings,{
    name:'ErrorStrings',
})