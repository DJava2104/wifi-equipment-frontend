/** AuthResponseSchema */
export interface AuthResponseSchema {
  /** Аутентифицированный пользователь */
  user: UserSchema;
}

/** Body_create_router_api_router_post */
export interface BodyCreateRouterApiRouterPost {
  /**
   * Title
   * Название услуги
   */
  title: string;
  /**
   * Image
   * Изображение (jpg/png)
   */
  image: File | Blob;
  /**
   * Video
   * Видео (mp4)
   */
  video: File | Blob;
}

/** Body_like_router_api_router__id_routers__post */
export interface BodyLikeRouterApiRouterIdRoutersPost {
  /**
   * Like
   * 1 — поставить лайк, 0 — отменить
   * @min 0
   * @max 1
   */
  like: number;
}

/** Body_login_api_login_post */
export interface BodyLoginApiLoginPost {
  /**
   * Username
   * Логин
   */
  username: string;
  /**
   * Password
   * Пароль
   */
  password: string;
}

/** Body_publish_router_api_router__id_routers__put */
export interface BodyPublishRouterApiRouterIdRoutersPut {
  /**
   * Description
   * Описание услуги
   */
  description: string;
  /**
   * Frequency
   * Частота, ГГц (из неё вычисляется band)
   */
  frequency: number;
  /**
   * Standard
   * Стандарт Wi-Fi (802.11ac и т.п.)
   * @default ""
   */
  standard?: string;
  /**
   * Max Speed
   * Макс. скорость, Мбит/с
   */
  max_speed?: number | null;
  /**
   * Antennas
   * Количество антенн
   * @default ""
   */
  antennas?: string | null;
}

/** Body_register_api_register_post */
export interface BodyRegisterApiRegisterPost {
  /**
   * Username
   * Логин (уникальный)
   */
  username: string;
  /**
   * Password
   * Пароль (хранится открытым текстом, как в таблице users)
   */
  password: string;
}

/** FeedItemSchema */
export interface FeedItemSchema {
  /**
   * Id Routers
   * Идентификатор услуги
   */
  id_routers: number;
  /**
   * Title
   * Название
   */
  title: string;
  /**
   * Standard
   * Стандарт Wi-Fi
   */
  standard?: string | null;
  /**
   * Max Speed
   * Макс. скорость, Мбит/с
   */
  max_speed?: number | null;
  /**
   * Band
   * Диапазон (строка)
   */
  band?: string | null;
  /**
   * Antennas
   * Количество антенн
   */
  antennas?: string | null;
  /**
   * Frequency
   * Частота, ГГц
   */
  frequency?: number | null;
  /**
   * Image Url
   * Адрес изображения в MinIO (в БД — имя файла)
   */
  image_url?: string | null;
  /**
   * Video Url
   * Адрес видео в MinIO (в БД — имя файла)
   */
  video_url?: string | null;
  /**
   * Description
   * Описание
   */
  description?: string | null;
  /**
   * Status
   * черновик / опубликован / удален
   */
  status: string;
  /**
   * Date Created
   * Дата создания
   */
  date_created?: string | null;
  /**
   * Creator
   * Логин создателя (заполняется из сессии)
   */
  creator: string;
  /**
   * Date Formed
   * Дата публикации
   */
  date_formed?: string | null;
  /**
   * Date Completed
   * Дата удаления
   */
  date_completed?: string | null;
  /**
   * Like Count
   * Количество лайков
   */
  like_count: number;
  /**
   * Is Liked
   * 1 — лайк текущего пользователя, иначе 0
   */
  is_liked: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** LikeResponseSchema */
export interface LikeResponseSchema {
  /**
   * Like Count
   * Количество лайков после изменения
   */
  like_count: number;
}

/** RouterListItemSchema */
export interface RouterListItemSchema {
  /**
   * Id Routers
   * Идентификатор услуги
   */
  id_routers: number;
  /**
   * Title
   * Название
   */
  title: string;
  /**
   * Standard
   * Стандарт Wi-Fi
   */
  standard?: string | null;
  /**
   * Max Speed
   * Макс. скорость, Мбит/с
   */
  max_speed?: number | null;
  /**
   * Band
   * Диапазон (строка)
   */
  band?: string | null;
  /**
   * Antennas
   * Количество антенн
   */
  antennas?: string | null;
  /**
   * Frequency
   * Частота, ГГц
   */
  frequency?: number | null;
  /**
   * Image Url
   * Адрес изображения в MinIO (в БД — имя файла)
   */
  image_url?: string | null;
  /**
   * Video Url
   * Адрес видео в MinIO (в БД — имя файла)
   */
  video_url?: string | null;
  /**
   * Description
   * Описание
   */
  description?: string | null;
  /**
   * Status
   * черновик / опубликован / удален
   */
  status: string;
  /**
   * Date Created
   * Дата создания
   */
  date_created?: string | null;
  /**
   * Creator
   * Логин создателя (заполняется из сессии)
   */
  creator: string;
  /**
   * Date Formed
   * Дата публикации
   */
  date_formed?: string | null;
  /**
   * Date Completed
   * Дата удаления
   */
  date_completed?: string | null;
  /**
   * Is Creator
   * 1 — текущий пользователь является создателем, иначе 0
   */
  is_creator: number;
}

/** RouterSchema */
export interface RouterSchema {
  /**
   * Id Routers
   * Идентификатор услуги
   */
  id_routers: number;
  /**
   * Title
   * Название
   */
  title: string;
  /**
   * Standard
   * Стандарт Wi-Fi
   */
  standard?: string | null;
  /**
   * Max Speed
   * Макс. скорость, Мбит/с
   */
  max_speed?: number | null;
  /**
   * Band
   * Диапазон (строка)
   */
  band?: string | null;
  /**
   * Antennas
   * Количество антенн
   */
  antennas?: string | null;
  /**
   * Frequency
   * Частота, ГГц
   */
  frequency?: number | null;
  /**
   * Image Url
   * Адрес изображения в MinIO (в БД — имя файла)
   */
  image_url?: string | null;
  /**
   * Video Url
   * Адрес видео в MinIO (в БД — имя файла)
   */
  video_url?: string | null;
  /**
   * Description
   * Описание
   */
  description?: string | null;
  /**
   * Status
   * черновик / опубликован / удален
   */
  status: string;
  /**
   * Date Created
   * Дата создания
   */
  date_created?: string | null;
  /**
   * Creator
   * Логин создателя (заполняется из сессии)
   */
  creator: string;
  /**
   * Date Formed
   * Дата публикации
   */
  date_formed?: string | null;
  /**
   * Date Completed
   * Дата удаления
   */
  date_completed?: string | null;
}

/** UserSchema */
export interface UserSchema {
  /**
   * Id User
   * Идентификатор пользователя
   */
  id_user: number;
  /**
   * Username
   * Логин
   */
  username: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Wi-Fi Routers API
 * @version 4.0.0
 *
 *
 * REST API каталога Wi-Fi оборудования с **сессионной аутентификацией через куку**.
 *
 * ### Правила доступа
 * * **Без авторизации** — только чтение: `GET /api/routers`, `GET /api/router`.
 *   Работает независимо от токена/куки.
 * * **С авторизацией** — методы создателя: создание черновика, публикация, удаление,
 *   лайк, получение черновика. Без куки — **401**, для чужой услуги — **403**.
 *
 * ### Как получить куку
 * 1. `POST /api/register` — регистрация (form-data: `username`, `password`).
 * 2. `POST /api/login` — в ответе заголовок `Set-Cookie: sessionId=...; HttpOnly`.
 *    Сессия сохраняется в Redis: `session:<id>` → `{"id_user": ..., "username": ...}`.
 * 3. В Swagger эта же вкладка браузера пришлёт куку автоматически.
 *    В Postman/Insomnia вставьте заголовок `Cookie: sessionId=<значение>`.
 * 4. `POST /api/logout` — удаляет сессию из Redis (мгновенная деавторизация).
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  routers = {
    /**
     * @description Открытый метод (без авторизации). `freq_min`/`freq_max` — диапазон частоты, ГГц. Поле `is_creator` = 1, если создатель совпадает с текущим пользователем (для гостя всегда 0).
     *
     * @tags Услуга
     * @name GetRouters
     * @summary Список опубликованных услуг с фильтром по частоте
     * @request GET:/api/routers
     */
    getRouters: (
      query?: {
        /**
         * Freq Min
         * Минимальная частота, ГГц
         */
        freq_min?: number | null;
        /**
         * Freq Max
         * Максимальная частота, ГГц
         */
        freq_max?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<RouterListItemSchema[], HTTPValidationError>({
        path: `/api/routers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  router = {
    /**
     * @description Метод создателя: возвращает не более одного черновика текущего пользователя или null. Требуется кука sessionId.
     *
     * @tags Услуга
     * @name GetDraft
     * @summary Черновик текущего пользователя
     * @request GET:/api/router/draft
     * @secure
     */
    getDraft: (params: RequestParams = {}) =>
      this.request<RouterSchema | null, void>({
        path: `/api/router/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Открытый метод (без авторизации). Без `id_routers` — первая опубликованная услуга, с `id_routers` — указанная; `next=true` — следующая после неё по кругу. В ответе `like_count` и `is_liked` (0/1, для гостя всегда 0).
     *
     * @tags Услуга
     * @name GetRouter
     * @summary Лента опубликованных услуг
     * @request GET:/api/router
     */
    getRouter: (
      query?: {
        /**
         * Id Routers
         * Ид текущей услуги ленты (необязательно)
         */
        id_routers?: number | null;
        /**
         * Next
         * Следующее после указанного (по кругу)
         * @default false
         */
        next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FeedItemSchema, void | HTTPValidationError>({
        path: `/api/router`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод создателя. Файлы `image` и `video` загружаются в MinIO, в БД записываются их латинские имена (uuid.ext). `creator` заполняется автоматически из сессии. Не более одного черновика на пользователя.
     *
     * @tags Услуга
     * @name CreateRouter
     * @summary Создать черновик услуги (с картинкой и видео)
     * @request POST:/api/router
     * @secure
     */
    createRouter: (
      data: BodyCreateRouterApiRouterPost,
      params: RequestParams = {},
    ) =>
      this.request<RouterSchema, void | HTTPValidationError>({
        path: `/api/router`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод создателя. Заполняет описательные поля, вычисляет `band`, переводит статус в «опубликован» и фиксирует `date_formed`. Гость получает 401, чужую услугу опубликовать нельзя — 403.
     *
     * @tags Услуга
     * @name PublishRouter
     * @summary Опубликовать услугу (черновик → опубликован)
     * @request PUT:/api/router/{id_routers}
     * @secure
     */
    publishRouter: (
      idRouters: number,
      data: BodyPublishRouterApiRouterIdRoutersPut,
      params: RequestParams = {},
    ) =>
      this.request<RouterSchema, void | HTTPValidationError>({
        path: `/api/router/${idRouters}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод создателя. Статус меняется на «удалён», тело ответа пустое.
     *
     * @tags Услуга
     * @name DeleteRouter
     * @summary Мягкое удаление услуги (только свои)
     * @request DELETE:/api/router/{id_routers}
     * @secure
     */
    deleteRouter: (idRouters: number, params: RequestParams = {}) =>
      this.request<any, void | HTTPValidationError>({
        path: `/api/router/${idRouters}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод создателя. Form-поле `like`: 1 — поставить, 0 — отменить. Ответ: {like_count}.
     *
     * @tags Услуга
     * @name LikeRouter
     * @summary Поставить/снять лайк
     * @request POST:/api/router/{id_routers}
     * @secure
     */
    likeRouter: (
      idRouters: number,
      data: BodyLikeRouterApiRouterIdRoutersPost,
      params: RequestParams = {},
    ) =>
      this.request<LikeResponseSchema, void | HTTPValidationError>({
        path: `/api/router/${idRouters}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * @description Создаёт запись в таблице `users`. Логин должен быть уникален — иначе возвращается 409. Авторизация после регистрации не выдаётся: выполните POST /api/login.
     *
     * @tags Пользователь
     * @name Register
     * @summary Регистрация пользователя
     * @request POST:/api/register
     */
    register: (data: BodyRegisterApiRegisterPost, params: RequestParams = {}) =>
      this.request<UserSchema, void | HTTPValidationError>({
        path: `/api/register`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Проверяет логин и пароль, создаёт сессию в Redis (`session:<id>` → JSON с id_user и username) и устанавливает HttpOnly-куку sessionId. Значение куки используется во всех авторизованных запросах (Swagger / Postman / Insomnia).
     *
     * @tags Пользователь
     * @name Login
     * @summary Аутентификация (выдача сессии)
     * @request POST:/api/login
     */
    login: (data: BodyLoginApiLoginPost, params: RequestParams = {}) =>
      this.request<AuthResponseSchema, void | HTTPValidationError>({
        path: `/api/login`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * @description Метод с авторизацией: удаляет сессию из Redis и очищает куку sessionId — мгновенная деавторизация. Без валидной куки — 401 (без авторизации доступно только чтение).
     *
     * @tags Пользователь
     * @name Logout
     * @summary Деавторизация (уничтожение сессии)
     * @request POST:/api/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
