import { GENDER, PARENT_RELATION } from "@/constants/system";

export interface CreateParentDto {
  motherName: string;
  fatherName: string;
  email: string;
  phone: string;
  occupation?: string;
  city: string;
  fullAddress: string;
  relation: PARENT_RELATION;
}

export interface CreateStudentDto {
  parent: CreateParentDto;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: GENDER;
}

export interface UpdateStudentDto extends CreateStudentDto {
  id: string;
}
