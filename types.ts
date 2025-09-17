// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
  thumbnail?: string;
}

// Provider interface
export interface Provider extends CosmicObject {
  type: 'providers';
  metadata: {
    name: string;
    description?: string;
    website?: string;
    icon_slug?: string;
  };
}

// AI Model interface
export interface AiModel extends CosmicObject {
  type: 'ai-models';
  metadata: {
    model_id: string;
    name: string;
    description?: string;
    provider?: Provider;
    context_length?: number;
    created_date?: string;
    hugging_face_id?: string;
    architecture?: {
      modality?: string;
      input_modalities?: string[];
      output_modalities?: string[];
      tokenizer?: string;
      instruct_type?: string;
    };
    pricing?: {
      prompt?: string;
      completion?: string;
      request?: string;
      image?: string;
      video?: string;
      audio?: string;
      web_search?: string;
      internal_reasoning?: string;
      input_cache_read?: string;
      input_cache_write?: string;
    };
    top_provider?: {
      context_length?: number;
      max_completion_tokens?: number;
      is_moderated?: boolean;
    };
    per_request_limits?: {
      prompt_tokens?: number;
      completion_tokens?: number;
    };
    supported_parameters?: string[];
    model_status?: {
      key: string;
      value: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProvider(obj: CosmicObject): obj is Provider {
  return obj.type === 'providers';
}

export function isAiModel(obj: CosmicObject): obj is AiModel {
  return obj.type === 'ai-models';
}

// Model status type
export type ModelStatus = 'active' | 'deprecated' | 'beta';

// Utility types
export type CreateModelData = Omit<AiModel, 'id' | 'created_at' | 'modified_at'>;
export type CreateProviderData = Omit<Provider, 'id' | 'created_at' | 'modified_at'>;