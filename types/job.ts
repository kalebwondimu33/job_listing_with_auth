export interface Job {
  applicantsCount: number;
  average_rating: number;
  categories: string[];
  createdAt: string;
  datePosted: string;
  deadline: string;
  description: string;
  endDate: string;
  id: string;
  idealCandidate: string;
  isBookmarked: boolean;
  isRolling: boolean;
  location: string[];
  logoUrl: string;
  opType: string;
  orgEmail: string;
  orgID: string;
  orgName: string;
  orgPrimaryPhone: string;
  perksAndBenefits: string | null;
  questions: string | null;
  requiredSkills: string[];
  requirements: string;
  responsibilities: string;
  startDate: string;
  status: string;
  title: string;
  total_reviews: number;
  updatedAt: string;
  viewsCount: number;
  whenAndWhere: string;
}
