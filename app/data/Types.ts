// project type for projects section components
export type Project = {
  title: string;
  description?: string;
  stats: string[];
  status?: string;
  images?: React.ReactNode;
  blog: React.ReactNode;
};
