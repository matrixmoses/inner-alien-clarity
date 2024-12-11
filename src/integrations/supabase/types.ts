export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          badge_type: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          required_value: number
        }
        Insert: {
          badge_type: string
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          required_value: number
        }
        Update: {
          badge_type?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          required_value?: number
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          date?: string
          id?: string
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          created_at: string
          current_progress: number | null
          id: string
          name: string
          required_tasks: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_progress?: number | null
          id?: string
          name: string
          required_tasks: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_progress?: number | null
          id?: string
          name?: string
          required_tasks?: number
          updated_at?: string
        }
        Relationships: []
      }
      pomodoro_sessions: {
        Row: {
          completed: boolean | null
          created_at: string
          duration: number
          end_time: string | null
          id: string
          start_time: string
          task_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration: number
          end_time?: string | null
          id?: string
          start_time: string
          task_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration?: number
          end_time?: string | null
          id?: string
          start_time?: string
          task_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pomodoro_sessions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      procrastination_entries: {
        Row: {
          ai_feedback: string | null
          created_at: string
          custom_reason: string | null
          id: string
          reason: Database["public"]["Enums"]["procrastination_reason"]
          reflection: string | null
          rescheduled_to: string | null
          resolved: boolean | null
          task_id: string
          user_id: string
        }
        Insert: {
          ai_feedback?: string | null
          created_at?: string
          custom_reason?: string | null
          id?: string
          reason: Database["public"]["Enums"]["procrastination_reason"]
          reflection?: string | null
          rescheduled_to?: string | null
          resolved?: boolean | null
          task_id: string
          user_id: string
        }
        Update: {
          ai_feedback?: string | null
          created_at?: string
          custom_reason?: string | null
          id?: string
          reason?: Database["public"]["Enums"]["procrastination_reason"]
          reflection?: string | null
          rescheduled_to?: string | null
          resolved?: boolean | null
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "procrastination_entries_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      procrastination_insights: {
        Row: {
          created_at: string
          id: string
          insight_content: string
          insight_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          insight_content: string
          insight_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          insight_content?: string
          insight_type?: string
          user_id?: string
        }
        Relationships: []
      }
      streak_history: {
        Row: {
          created_at: string
          date: string | null
          id: string
          pomodoros_completed: number | null
          tasks_completed: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          pomodoros_completed?: number | null
          tasks_completed?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          pomodoros_completed?: number | null
          tasks_completed?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subject_streaks: {
        Row: {
          all_time_total_hours: number | null
          created_at: string
          id: string
          monthly_streak: number | null
          monthly_total_hours: number | null
          overall_streak: number | null
          subject: Database["public"]["Enums"]["task_subject"]
          updated_at: string
          user_id: string
          weekly_streak: number | null
          weekly_total_hours: number | null
        }
        Insert: {
          all_time_total_hours?: number | null
          created_at?: string
          id?: string
          monthly_streak?: number | null
          monthly_total_hours?: number | null
          overall_streak?: number | null
          subject: Database["public"]["Enums"]["task_subject"]
          updated_at?: string
          user_id: string
          weekly_streak?: number | null
          weekly_total_hours?: number | null
        }
        Update: {
          all_time_total_hours?: number | null
          created_at?: string
          id?: string
          monthly_streak?: number | null
          monthly_total_hours?: number | null
          overall_streak?: number | null
          subject?: Database["public"]["Enums"]["task_subject"]
          updated_at?: string
          user_id?: string
          weekly_streak?: number | null
          weekly_total_hours?: number | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          activity: string
          category: string | null
          completed: boolean | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          is_completed: boolean | null
          is_editing: boolean | null
          start_time: string
          subject: Database["public"]["Enums"]["task_subject"] | null
          task_date: string | null
          task_description: string | null
          task_name: string | null
          user_id: string
        }
        Insert: {
          activity: string
          category?: string | null
          completed?: boolean | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          is_completed?: boolean | null
          is_editing?: boolean | null
          start_time: string
          subject?: Database["public"]["Enums"]["task_subject"] | null
          task_date?: string | null
          task_description?: string | null
          task_name?: string | null
          user_id: string
        }
        Update: {
          activity?: string
          category?: string | null
          completed?: boolean | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          is_completed?: boolean | null
          is_editing?: boolean | null
          start_time?: string
          subject?: Database["public"]["Enums"]["task_subject"] | null
          task_date?: string | null
          task_description?: string | null
          task_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string
          date: string
          id: string
          pomodoros_completed: number | null
          tasks_completed: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          pomodoros_completed?: number | null
          tasks_completed?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          pomodoros_completed?: number | null
          tasks_completed?: number | null
          user_id?: string
        }
        Relationships: []
      }
      wins: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          date?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_daily_task_completion: {
        Args: {
          user_id_param: string
          date_param: string
        }
        Returns: number
      }
      calculate_task_completion_percentage: {
        Args: {
          p_user_id: string
          p_date: string
        }
        Returns: number
      }
      check_and_award_achievements: {
        Args: {
          user_id_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      procrastination_reason:
        | "too_difficult"
        | "lack_of_motivation"
        | "forgot"
        | "custom"
      task_subject: "work" | "sports" | "study" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
