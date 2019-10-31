export interface IProfile {
  personal: IPersonalInfo;
  experience: ICompany[];
  education: ISchool[];
  skills: string[];
}

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  github?: string;
  phone?: string;
}

export interface ICompany {
  companyName: string;
  fromDate: string;
  toDate?: string;
  title: string;
  description?: string;

}
export interface ISchool {
  schoolName: string;
  fromDate: string;
  toDate?: string;
  field: string;
  description?: string;
}


export const defaultProfile: IProfile = {
  personal: {
    firstName: 'Tsachi',
    lastName: 'Shushan',
    email: 'tsachi@gmaiul.com',
    github: 'tsachis',
    phone: '0525695206',
  },
  experience: [
    {
      companyName: 'Outbrain',
      fromDate: '2015 04',
      toDate: '',
      title: 'SW engineer',
      description: ''
    }
  ],
  education: [
    {
      schoolName: 'HIT',
      fromDate: '2002',
      toDate: '2005',
      field: 'CS',
    }
  ],
  skills: ['js', 'angular']
};
