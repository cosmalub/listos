export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      music_requests: {
        Row: {
          created_at: string
          generated_variants: Json | null
          id: string
          lyrics: string
          style: string | null
          updated_at: string
          user_feedback: string | null
        }
        Insert: {
          created_at?: string
          generated_variants?: Json | null
          id?: string
          lyrics: string
          style?: string | null
          updated_at?: string
          user_feedback?: string | null
        }
        Update: {
          created_at?: string
          generated_variants?: Json | null
          id?: string
          lyrics?: string
          style?: string | null
          updated_at?: string
          user_feedback?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          back_design_color: string | null
          back_design_message: string | null
          back_image_url: string | null
          created_at: string
          draft_page_url: string | null
          front_design_caption: string | null
          front_design_mode: string | null
          front_design_prompt: string | null
          front_design_style: string | null
          front_image_url: string | null
          id: string
          internal_comment: string | null
          lyrics: string
          music_audio_url: string | null
          music_selected: boolean | null
          music_variant_description: string | null
          music_variant_id: string | null
          music_variant_style: string | null
          music_variant_title: string | null
          page_occasion: string
          page_recipient: string
          page_sender: string
          pre_order_id: string
          production_stage: string | null
          qr_code_url: string | null
          studio_completed: boolean
          studio_completed_at: string | null
          studio_started_at: string | null
          updated_at: string
        }
        Insert: {
          back_design_color?: string | null
          back_design_message?: string | null
          back_image_url?: string | null
          created_at?: string
          draft_page_url?: string | null
          front_design_caption?: string | null
          front_design_mode?: string | null
          front_design_prompt?: string | null
          front_design_style?: string | null
          front_image_url?: string | null
          id?: string
          internal_comment?: string | null
          lyrics: string
          music_audio_url?: string | null
          music_selected?: boolean | null
          music_variant_description?: string | null
          music_variant_id?: string | null
          music_variant_style?: string | null
          music_variant_title?: string | null
          page_occasion: string
          page_recipient: string
          page_sender: string
          pre_order_id: string
          production_stage?: string | null
          qr_code_url?: string | null
          studio_completed?: boolean
          studio_completed_at?: string | null
          studio_started_at?: string | null
          updated_at?: string
        }
        Update: {
          back_design_color?: string | null
          back_design_message?: string | null
          back_image_url?: string | null
          created_at?: string
          draft_page_url?: string | null
          front_design_caption?: string | null
          front_design_mode?: string | null
          front_design_prompt?: string | null
          front_design_style?: string | null
          front_image_url?: string | null
          id?: string
          internal_comment?: string | null
          lyrics?: string
          music_audio_url?: string | null
          music_selected?: boolean | null
          music_variant_description?: string | null
          music_variant_id?: string | null
          music_variant_style?: string | null
          music_variant_title?: string | null
          page_occasion?: string
          page_recipient?: string
          page_sender?: string
          pre_order_id?: string
          production_stage?: string | null
          qr_code_url?: string | null
          studio_completed?: boolean
          studio_completed_at?: string | null
          studio_started_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pre_order_id_fkey"
            columns: ["pre_order_id"]
            isOneToOne: false
            referencedRelation: "pre_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_backup: {
        Row: {
          access_token: string | null
          back_design_color: string | null
          back_design_message: string | null
          back_image_url: string | null
          created_at: string | null
          draft_page_url: string | null
          front_design_caption: string | null
          front_design_mode: string | null
          front_design_prompt: string | null
          front_design_style: string | null
          front_image_url: string | null
          id: string | null
          is_paid: boolean | null
          lyrics: string | null
          music_audio_url: string | null
          music_selected: boolean | null
          music_variant_description: string | null
          music_variant_id: string | null
          music_variant_style: string | null
          music_variant_title: string | null
          page_occasion: string | null
          page_recipient: string | null
          page_sender: string | null
          qr_code_url: string | null
          status: string | null
          studio_completed: boolean | null
          studio_completed_at: string | null
          studio_started_at: string | null
          updated_at: string | null
          user_email: string | null
          user_phone: string | null
        }
        Insert: {
          access_token?: string | null
          back_design_color?: string | null
          back_design_message?: string | null
          back_image_url?: string | null
          created_at?: string | null
          draft_page_url?: string | null
          front_design_caption?: string | null
          front_design_mode?: string | null
          front_design_prompt?: string | null
          front_design_style?: string | null
          front_image_url?: string | null
          id?: string | null
          is_paid?: boolean | null
          lyrics?: string | null
          music_audio_url?: string | null
          music_selected?: boolean | null
          music_variant_description?: string | null
          music_variant_id?: string | null
          music_variant_style?: string | null
          music_variant_title?: string | null
          page_occasion?: string | null
          page_recipient?: string | null
          page_sender?: string | null
          qr_code_url?: string | null
          status?: string | null
          studio_completed?: boolean | null
          studio_completed_at?: string | null
          studio_started_at?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_phone?: string | null
        }
        Update: {
          access_token?: string | null
          back_design_color?: string | null
          back_design_message?: string | null
          back_image_url?: string | null
          created_at?: string | null
          draft_page_url?: string | null
          front_design_caption?: string | null
          front_design_mode?: string | null
          front_design_prompt?: string | null
          front_design_style?: string | null
          front_image_url?: string | null
          id?: string | null
          is_paid?: boolean | null
          lyrics?: string | null
          music_audio_url?: string | null
          music_selected?: boolean | null
          music_variant_description?: string | null
          music_variant_id?: string | null
          music_variant_style?: string | null
          music_variant_title?: string | null
          page_occasion?: string | null
          page_recipient?: string | null
          page_sender?: string | null
          qr_code_url?: string | null
          status?: string | null
          studio_completed?: boolean | null
          studio_completed_at?: string | null
          studio_started_at?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_phone?: string | null
        }
        Relationships: []
      }
      pre_orders: {
        Row: {
          access_token: string
          city: string | null
          comment: string | null
          contact_type: string | null
          created_at: string
          crm_stage: string | null
          id: string
          internal_comment: string | null
          is_paid: boolean
          nova_poshta: string | null
          status: string | null
          updated_at: string
          user_email: string | null
          user_phone: string | null
        }
        Insert: {
          access_token?: string
          city?: string | null
          comment?: string | null
          contact_type?: string | null
          created_at?: string
          crm_stage?: string | null
          id?: string
          internal_comment?: string | null
          is_paid?: boolean
          nova_poshta?: string | null
          status?: string | null
          updated_at?: string
          user_email?: string | null
          user_phone?: string | null
        }
        Update: {
          access_token?: string
          city?: string | null
          comment?: string | null
          contact_type?: string | null
          created_at?: string
          crm_stage?: string | null
          id?: string
          internal_comment?: string | null
          is_paid?: boolean
          nova_poshta?: string | null
          status?: string | null
          updated_at?: string
          user_email?: string | null
          user_phone?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          discount_percent: number
          expires_at: string
          id: string
          is_used: boolean
          pre_order_id: string | null
          updated_at: string
          used_at: string | null
          used_in_order_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_percent?: number
          expires_at: string
          id?: string
          is_used?: boolean
          pre_order_id?: string | null
          updated_at?: string
          used_at?: string | null
          used_in_order_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_percent?: number
          expires_at?: string
          id?: string
          is_used?: boolean
          pre_order_id?: string | null
          updated_at?: string
          used_at?: string | null
          used_in_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_pre_order_id_fkey"
            columns: ["pre_order_id"]
            isOneToOne: false
            referencedRelation: "pre_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_used_in_order_id_fkey"
            columns: ["used_in_order_id"]
            isOneToOne: false
            referencedRelation: "pre_orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
