export interface ISkin {
  name: string;
  displayName: string;
  component: string;
  createdBy?: ICreatedBy[];
}

export interface ICreatedBy {
  name: string;
  link?: string;
}
