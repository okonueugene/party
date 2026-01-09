export interface DashboardMetrics {
  users: UserMetrics;
  posts: PostMetrics;
  engagement: EngagementMetrics;
  moderation: ModerationMetrics;
}

export interface UserMetrics {
  total: number;
  active: number;
  verified: number;
  suspended: number;
  admins: number;
  today: number;
  yesterday: number;
  change_24h: number;
  this_week: number;
}

export interface PostMetrics {
  total: number;
  active: number;
  flagged: number;
  today: number;
  yesterday: number;
  change_24h: number;
  this_week: number;
  with_images: number;
  with_audio: number;
}

export interface EngagementMetrics {
  total_likes: number;
  total_comments: number;
  avg_likes_per_post: number;
  avg_comments_per_post: number;
  today_likes: number;
  today_comments: number;
}

export interface ModerationMetrics {
  pending_flags: number;
  reviewed_flags: number;
  action_taken: number;
  flagged_posts: number;
  suspended_users: number;
}

export interface RecentUser {
  id: number;
  name: string;
  phone_number: string;
  ward: string;
  constituency: string;
  county: string;
  verified: boolean;
  created_at: string;
}

export interface RecentPost {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  ward: string;
  likes_count: number;
  comments_count: number;
  is_flagged: boolean;
  created_at: string;
}

export interface RecentFlag {
  id: number;
  reason: string;
  post_id: number;
  post_content: string;
  reported_by: string;
  post_author: string;
  created_at: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recent_activity: {
    recent_users: RecentUser[];
    recent_posts: RecentPost[];
    recent_flags: RecentFlag[];
  };
  timestamp: string;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconBgColor?: string;
  subtitle?: string;
  alert?: boolean;
}