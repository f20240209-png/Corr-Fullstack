
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Recommendation
 * 
 */
export type Recommendation = $Result.DefaultSelection<Prisma.$RecommendationPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model SkincareLog
 * 
 */
export type SkincareLog = $Result.DefaultSelection<Prisma.$SkincareLogPayload>
/**
 * Model Ingredient_Conflict
 * 
 */
export type Ingredient_Conflict = $Result.DefaultSelection<Prisma.$Ingredient_ConflictPayload>
/**
 * Model CommunityPost
 * 
 */
export type CommunityPost = $Result.DefaultSelection<Prisma.$CommunityPostPayload>
/**
 * Model CommunityAnswer
 * 
 */
export type CommunityAnswer = $Result.DefaultSelection<Prisma.$CommunityAnswerPayload>
/**
 * Model FriendRequest
 * 
 */
export type FriendRequest = $Result.DefaultSelection<Prisma.$FriendRequestPayload>
/**
 * Model ProductDiscovery
 * 
 */
export type ProductDiscovery = $Result.DefaultSelection<Prisma.$ProductDiscoveryPayload>
/**
 * Model ProductDiscoveryImage
 * 
 */
export type ProductDiscoveryImage = $Result.DefaultSelection<Prisma.$ProductDiscoveryImagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recommendation`: Exposes CRUD operations for the **Recommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recommendations
    * const recommendations = await prisma.recommendation.findMany()
    * ```
    */
  get recommendation(): Prisma.RecommendationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skincareLog`: Exposes CRUD operations for the **SkincareLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkincareLogs
    * const skincareLogs = await prisma.skincareLog.findMany()
    * ```
    */
  get skincareLog(): Prisma.SkincareLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingredient_Conflict`: Exposes CRUD operations for the **Ingredient_Conflict** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredient_Conflicts
    * const ingredient_Conflicts = await prisma.ingredient_Conflict.findMany()
    * ```
    */
  get ingredient_Conflict(): Prisma.Ingredient_ConflictDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.communityPost`: Exposes CRUD operations for the **CommunityPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommunityPosts
    * const communityPosts = await prisma.communityPost.findMany()
    * ```
    */
  get communityPost(): Prisma.CommunityPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.communityAnswer`: Exposes CRUD operations for the **CommunityAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommunityAnswers
    * const communityAnswers = await prisma.communityAnswer.findMany()
    * ```
    */
  get communityAnswer(): Prisma.CommunityAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendRequest`: Exposes CRUD operations for the **FriendRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendRequests
    * const friendRequests = await prisma.friendRequest.findMany()
    * ```
    */
  get friendRequest(): Prisma.FriendRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productDiscovery`: Exposes CRUD operations for the **ProductDiscovery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductDiscoveries
    * const productDiscoveries = await prisma.productDiscovery.findMany()
    * ```
    */
  get productDiscovery(): Prisma.ProductDiscoveryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productDiscoveryImage`: Exposes CRUD operations for the **ProductDiscoveryImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductDiscoveryImages
    * const productDiscoveryImages = await prisma.productDiscoveryImage.findMany()
    * ```
    */
  get productDiscoveryImage(): Prisma.ProductDiscoveryImageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Recommendation: 'Recommendation',
    Product: 'Product',
    SkincareLog: 'SkincareLog',
    Ingredient_Conflict: 'Ingredient_Conflict',
    CommunityPost: 'CommunityPost',
    CommunityAnswer: 'CommunityAnswer',
    FriendRequest: 'FriendRequest',
    ProductDiscovery: 'ProductDiscovery',
    ProductDiscoveryImage: 'ProductDiscoveryImage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "recommendation" | "product" | "skincareLog" | "ingredient_Conflict" | "communityPost" | "communityAnswer" | "friendRequest" | "productDiscovery" | "productDiscoveryImage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Recommendation: {
        payload: Prisma.$RecommendationPayload<ExtArgs>
        fields: Prisma.RecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecommendationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecommendationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findFirst: {
            args: Prisma.RecommendationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecommendationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findMany: {
            args: Prisma.RecommendationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          create: {
            args: Prisma.RecommendationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          createMany: {
            args: Prisma.RecommendationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecommendationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          update: {
            args: Prisma.RecommendationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          deleteMany: {
            args: Prisma.RecommendationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecommendationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecommendationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          aggregate: {
            args: Prisma.RecommendationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecommendation>
          }
          groupBy: {
            args: Prisma.RecommendationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecommendationCountArgs<ExtArgs>
            result: $Utils.Optional<RecommendationCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      SkincareLog: {
        payload: Prisma.$SkincareLogPayload<ExtArgs>
        fields: Prisma.SkincareLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkincareLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkincareLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          findFirst: {
            args: Prisma.SkincareLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkincareLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          findMany: {
            args: Prisma.SkincareLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>[]
          }
          create: {
            args: Prisma.SkincareLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          createMany: {
            args: Prisma.SkincareLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkincareLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          update: {
            args: Prisma.SkincareLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          deleteMany: {
            args: Prisma.SkincareLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkincareLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkincareLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkincareLogPayload>
          }
          aggregate: {
            args: Prisma.SkincareLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkincareLog>
          }
          groupBy: {
            args: Prisma.SkincareLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkincareLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkincareLogCountArgs<ExtArgs>
            result: $Utils.Optional<SkincareLogCountAggregateOutputType> | number
          }
        }
      }
      Ingredient_Conflict: {
        payload: Prisma.$Ingredient_ConflictPayload<ExtArgs>
        fields: Prisma.Ingredient_ConflictFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Ingredient_ConflictFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Ingredient_ConflictFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          findFirst: {
            args: Prisma.Ingredient_ConflictFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Ingredient_ConflictFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          findMany: {
            args: Prisma.Ingredient_ConflictFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>[]
          }
          create: {
            args: Prisma.Ingredient_ConflictCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          createMany: {
            args: Prisma.Ingredient_ConflictCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Ingredient_ConflictDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          update: {
            args: Prisma.Ingredient_ConflictUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          deleteMany: {
            args: Prisma.Ingredient_ConflictDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Ingredient_ConflictUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Ingredient_ConflictUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Ingredient_ConflictPayload>
          }
          aggregate: {
            args: Prisma.Ingredient_ConflictAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngredient_Conflict>
          }
          groupBy: {
            args: Prisma.Ingredient_ConflictGroupByArgs<ExtArgs>
            result: $Utils.Optional<Ingredient_ConflictGroupByOutputType>[]
          }
          count: {
            args: Prisma.Ingredient_ConflictCountArgs<ExtArgs>
            result: $Utils.Optional<Ingredient_ConflictCountAggregateOutputType> | number
          }
        }
      }
      CommunityPost: {
        payload: Prisma.$CommunityPostPayload<ExtArgs>
        fields: Prisma.CommunityPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          findFirst: {
            args: Prisma.CommunityPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          findMany: {
            args: Prisma.CommunityPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>[]
          }
          create: {
            args: Prisma.CommunityPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          createMany: {
            args: Prisma.CommunityPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommunityPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          update: {
            args: Prisma.CommunityPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          deleteMany: {
            args: Prisma.CommunityPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommunityPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPostPayload>
          }
          aggregate: {
            args: Prisma.CommunityPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunityPost>
          }
          groupBy: {
            args: Prisma.CommunityPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityPostCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityPostCountAggregateOutputType> | number
          }
        }
      }
      CommunityAnswer: {
        payload: Prisma.$CommunityAnswerPayload<ExtArgs>
        fields: Prisma.CommunityAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          findFirst: {
            args: Prisma.CommunityAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          findMany: {
            args: Prisma.CommunityAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>[]
          }
          create: {
            args: Prisma.CommunityAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          createMany: {
            args: Prisma.CommunityAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommunityAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          update: {
            args: Prisma.CommunityAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          deleteMany: {
            args: Prisma.CommunityAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommunityAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityAnswerPayload>
          }
          aggregate: {
            args: Prisma.CommunityAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunityAnswer>
          }
          groupBy: {
            args: Prisma.CommunityAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityAnswerCountAggregateOutputType> | number
          }
        }
      }
      FriendRequest: {
        payload: Prisma.$FriendRequestPayload<ExtArgs>
        fields: Prisma.FriendRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findFirst: {
            args: Prisma.FriendRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findMany: {
            args: Prisma.FriendRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          create: {
            args: Prisma.FriendRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          createMany: {
            args: Prisma.FriendRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FriendRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          update: {
            args: Prisma.FriendRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          deleteMany: {
            args: Prisma.FriendRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FriendRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          aggregate: {
            args: Prisma.FriendRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendRequest>
          }
          groupBy: {
            args: Prisma.FriendRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendRequestCountArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestCountAggregateOutputType> | number
          }
        }
      }
      ProductDiscovery: {
        payload: Prisma.$ProductDiscoveryPayload<ExtArgs>
        fields: Prisma.ProductDiscoveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductDiscoveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductDiscoveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          findFirst: {
            args: Prisma.ProductDiscoveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductDiscoveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          findMany: {
            args: Prisma.ProductDiscoveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>[]
          }
          create: {
            args: Prisma.ProductDiscoveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          createMany: {
            args: Prisma.ProductDiscoveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDiscoveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          update: {
            args: Prisma.ProductDiscoveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          deleteMany: {
            args: Prisma.ProductDiscoveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductDiscoveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductDiscoveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryPayload>
          }
          aggregate: {
            args: Prisma.ProductDiscoveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductDiscovery>
          }
          groupBy: {
            args: Prisma.ProductDiscoveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscoveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductDiscoveryCountArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscoveryCountAggregateOutputType> | number
          }
        }
      }
      ProductDiscoveryImage: {
        payload: Prisma.$ProductDiscoveryImagePayload<ExtArgs>
        fields: Prisma.ProductDiscoveryImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductDiscoveryImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductDiscoveryImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          findFirst: {
            args: Prisma.ProductDiscoveryImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductDiscoveryImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          findMany: {
            args: Prisma.ProductDiscoveryImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>[]
          }
          create: {
            args: Prisma.ProductDiscoveryImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          createMany: {
            args: Prisma.ProductDiscoveryImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDiscoveryImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          update: {
            args: Prisma.ProductDiscoveryImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductDiscoveryImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductDiscoveryImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductDiscoveryImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscoveryImagePayload>
          }
          aggregate: {
            args: Prisma.ProductDiscoveryImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductDiscoveryImage>
          }
          groupBy: {
            args: Prisma.ProductDiscoveryImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscoveryImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductDiscoveryImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscoveryImageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    recommendation?: RecommendationOmit
    product?: ProductOmit
    skincareLog?: SkincareLogOmit
    ingredient_Conflict?: Ingredient_ConflictOmit
    communityPost?: CommunityPostOmit
    communityAnswer?: CommunityAnswerOmit
    friendRequest?: FriendRequestOmit
    productDiscovery?: ProductDiscoveryOmit
    productDiscoveryImage?: ProductDiscoveryImageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    discoveries: number
    skincareLogs: number
    communityPosts: number
    communityAnswers: number
    sentRequests: number
    receivedRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discoveries?: boolean | UserCountOutputTypeCountDiscoveriesArgs
    skincareLogs?: boolean | UserCountOutputTypeCountSkincareLogsArgs
    communityPosts?: boolean | UserCountOutputTypeCountCommunityPostsArgs
    communityAnswers?: boolean | UserCountOutputTypeCountCommunityAnswersArgs
    sentRequests?: boolean | UserCountOutputTypeCountSentRequestsArgs
    receivedRequests?: boolean | UserCountOutputTypeCountReceivedRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiscoveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscoveryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkincareLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkincareLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommunityPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityPostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommunityAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityAnswerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }


  /**
   * Count Type CommunityPostCountOutputType
   */

  export type CommunityPostCountOutputType = {
    answers: number
  }

  export type CommunityPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | CommunityPostCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * CommunityPostCountOutputType without action
   */
  export type CommunityPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPostCountOutputType
     */
    select?: CommunityPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommunityPostCountOutputType without action
   */
  export type CommunityPostCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityAnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    googleId: string | null
    phoneNumber: string | null
    isNewUser: boolean | null
    username: string | null
    usernameChangedAt: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    googleId: string | null
    phoneNumber: string | null
    isNewUser: boolean | null
    username: string | null
    usernameChangedAt: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    googleId: number
    phoneNumber: number
    isNewUser: number
    username: number
    usernameChangedAt: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    googleId?: true
    phoneNumber?: true
    isNewUser?: true
    username?: true
    usernameChangedAt?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    googleId?: true
    phoneNumber?: true
    isNewUser?: true
    username?: true
    usernameChangedAt?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    googleId?: true
    phoneNumber?: true
    isNewUser?: true
    username?: true
    usernameChangedAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string | null
    email: string | null
    password: string | null
    googleId: string | null
    phoneNumber: string | null
    isNewUser: boolean
    username: string | null
    usernameChangedAt: Date | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    phoneNumber?: boolean
    isNewUser?: boolean
    username?: boolean
    usernameChangedAt?: boolean
    createdAt?: boolean
    discoveries?: boolean | User$discoveriesArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    skincareLogs?: boolean | User$skincareLogsArgs<ExtArgs>
    communityPosts?: boolean | User$communityPostsArgs<ExtArgs>
    communityAnswers?: boolean | User$communityAnswersArgs<ExtArgs>
    sentRequests?: boolean | User$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | User$receivedRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    phoneNumber?: boolean
    isNewUser?: boolean
    username?: boolean
    usernameChangedAt?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "googleId" | "phoneNumber" | "isNewUser" | "username" | "usernameChangedAt" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discoveries?: boolean | User$discoveriesArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    skincareLogs?: boolean | User$skincareLogsArgs<ExtArgs>
    communityPosts?: boolean | User$communityPostsArgs<ExtArgs>
    communityAnswers?: boolean | User$communityAnswersArgs<ExtArgs>
    sentRequests?: boolean | User$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | User$receivedRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      discoveries: Prisma.$ProductDiscoveryPayload<ExtArgs>[]
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      skincareLogs: Prisma.$SkincareLogPayload<ExtArgs>[]
      communityPosts: Prisma.$CommunityPostPayload<ExtArgs>[]
      communityAnswers: Prisma.$CommunityAnswerPayload<ExtArgs>[]
      sentRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
      receivedRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      email: string | null
      password: string | null
      googleId: string | null
      phoneNumber: string | null
      isNewUser: boolean
      username: string | null
      usernameChangedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discoveries<T extends User$discoveriesArgs<ExtArgs> = {}>(args?: Subset<T, User$discoveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skincareLogs<T extends User$skincareLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$skincareLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    communityPosts<T extends User$communityPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$communityPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    communityAnswers<T extends User$communityAnswersArgs<ExtArgs> = {}>(args?: Subset<T, User$communityAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentRequests<T extends User$sentRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedRequests<T extends User$receivedRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly isNewUser: FieldRef<"User", 'Boolean'>
    readonly username: FieldRef<"User", 'String'>
    readonly usernameChangedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.discoveries
   */
  export type User$discoveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    where?: ProductDiscoveryWhereInput
    orderBy?: ProductDiscoveryOrderByWithRelationInput | ProductDiscoveryOrderByWithRelationInput[]
    cursor?: ProductDiscoveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductDiscoveryScalarFieldEnum | ProductDiscoveryScalarFieldEnum[]
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.skincareLogs
   */
  export type User$skincareLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    where?: SkincareLogWhereInput
    orderBy?: SkincareLogOrderByWithRelationInput | SkincareLogOrderByWithRelationInput[]
    cursor?: SkincareLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkincareLogScalarFieldEnum | SkincareLogScalarFieldEnum[]
  }

  /**
   * User.communityPosts
   */
  export type User$communityPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    where?: CommunityPostWhereInput
    orderBy?: CommunityPostOrderByWithRelationInput | CommunityPostOrderByWithRelationInput[]
    cursor?: CommunityPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityPostScalarFieldEnum | CommunityPostScalarFieldEnum[]
  }

  /**
   * User.communityAnswers
   */
  export type User$communityAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    where?: CommunityAnswerWhereInput
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    cursor?: CommunityAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityAnswerScalarFieldEnum | CommunityAnswerScalarFieldEnum[]
  }

  /**
   * User.sentRequests
   */
  export type User$sentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * User.receivedRequests
   */
  export type User$receivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
    budget: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
    budget: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
    gender: string | null
    skinType: string | null
    skinGoals: string | null
    budget: number | null
    currentProducts: string | null
    currentRoutine: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
    gender: string | null
    skinType: string | null
    skinGoals: string | null
    budget: number | null
    currentProducts: string | null
    currentRoutine: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    age: number
    gender: number
    skinType: number
    skinGoals: number
    budget: number
    currentProducts: number
    currentRoutine: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
    userId?: true
    age?: true
    budget?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
    userId?: true
    age?: true
    budget?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    age?: true
    gender?: true
    skinType?: true
    skinGoals?: true
    budget?: true
    currentProducts?: true
    currentRoutine?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    age?: true
    gender?: true
    skinType?: true
    skinGoals?: true
    budget?: true
    currentProducts?: true
    currentRoutine?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    age?: true
    gender?: true
    skinType?: true
    skinGoals?: true
    budget?: true
    currentProducts?: true
    currentRoutine?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: number
    userId: number
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts: string | null
    currentRoutine: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    age?: boolean
    gender?: boolean
    skinType?: boolean
    skinGoals?: boolean
    budget?: boolean
    currentProducts?: boolean
    currentRoutine?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recommendation?: boolean | Profile$recommendationArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>



  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    age?: boolean
    gender?: boolean
    skinType?: boolean
    skinGoals?: boolean
    budget?: boolean
    currentProducts?: boolean
    currentRoutine?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "age" | "gender" | "skinType" | "skinGoals" | "budget" | "currentProducts" | "currentRoutine" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recommendation?: boolean | Profile$recommendationArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      recommendation: Prisma.$RecommendationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      age: number
      gender: string
      skinType: string
      skinGoals: string
      budget: number
      currentProducts: string | null
      currentRoutine: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recommendation<T extends Profile$recommendationArgs<ExtArgs> = {}>(args?: Subset<T, Profile$recommendationArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'Int'>
    readonly userId: FieldRef<"Profile", 'Int'>
    readonly age: FieldRef<"Profile", 'Int'>
    readonly gender: FieldRef<"Profile", 'String'>
    readonly skinType: FieldRef<"Profile", 'String'>
    readonly skinGoals: FieldRef<"Profile", 'String'>
    readonly budget: FieldRef<"Profile", 'Float'>
    readonly currentProducts: FieldRef<"Profile", 'String'>
    readonly currentRoutine: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.recommendation
   */
  export type Profile$recommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    where?: RecommendationWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Recommendation
   */

  export type AggregateRecommendation = {
    _count: RecommendationCountAggregateOutputType | null
    _avg: RecommendationAvgAggregateOutputType | null
    _sum: RecommendationSumAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  export type RecommendationAvgAggregateOutputType = {
    id: number | null
    profileId: number | null
  }

  export type RecommendationSumAggregateOutputType = {
    id: number | null
    profileId: number | null
  }

  export type RecommendationMinAggregateOutputType = {
    id: number | null
    profileId: number | null
    routine: string | null
    products: string | null
    productAnalysis: string | null
    isEffective: boolean | null
    hasCurrentProducts: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecommendationMaxAggregateOutputType = {
    id: number | null
    profileId: number | null
    routine: string | null
    products: string | null
    productAnalysis: string | null
    isEffective: boolean | null
    hasCurrentProducts: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecommendationCountAggregateOutputType = {
    id: number
    profileId: number
    routine: number
    products: number
    productAnalysis: number
    isEffective: number
    hasCurrentProducts: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecommendationAvgAggregateInputType = {
    id?: true
    profileId?: true
  }

  export type RecommendationSumAggregateInputType = {
    id?: true
    profileId?: true
  }

  export type RecommendationMinAggregateInputType = {
    id?: true
    profileId?: true
    routine?: true
    products?: true
    productAnalysis?: true
    isEffective?: true
    hasCurrentProducts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecommendationMaxAggregateInputType = {
    id?: true
    profileId?: true
    routine?: true
    products?: true
    productAnalysis?: true
    isEffective?: true
    hasCurrentProducts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecommendationCountAggregateInputType = {
    id?: true
    profileId?: true
    routine?: true
    products?: true
    productAnalysis?: true
    isEffective?: true
    hasCurrentProducts?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendation to aggregate.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recommendations
    **/
    _count?: true | RecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecommendationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecommendationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecommendationMaxAggregateInputType
  }

  export type GetRecommendationAggregateType<T extends RecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecommendation[P]>
      : GetScalarType<T[P], AggregateRecommendation[P]>
  }




  export type RecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithAggregationInput | RecommendationOrderByWithAggregationInput[]
    by: RecommendationScalarFieldEnum[] | RecommendationScalarFieldEnum
    having?: RecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecommendationCountAggregateInputType | true
    _avg?: RecommendationAvgAggregateInputType
    _sum?: RecommendationSumAggregateInputType
    _min?: RecommendationMinAggregateInputType
    _max?: RecommendationMaxAggregateInputType
  }

  export type RecommendationGroupByOutputType = {
    id: number
    profileId: number
    routine: string
    products: string
    productAnalysis: string | null
    isEffective: boolean
    hasCurrentProducts: boolean
    createdAt: Date
    updatedAt: Date
    _count: RecommendationCountAggregateOutputType | null
    _avg: RecommendationAvgAggregateOutputType | null
    _sum: RecommendationSumAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  type GetRecommendationGroupByPayload<T extends RecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
        }
      >
    >


  export type RecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    routine?: boolean
    products?: boolean
    productAnalysis?: boolean
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>



  export type RecommendationSelectScalar = {
    id?: boolean
    profileId?: boolean
    routine?: boolean
    products?: boolean
    productAnalysis?: boolean
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecommendationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "routine" | "products" | "productAnalysis" | "isEffective" | "hasCurrentProducts" | "createdAt" | "updatedAt", ExtArgs["result"]["recommendation"]>
  export type RecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $RecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recommendation"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      profileId: number
      routine: string
      products: string
      productAnalysis: string | null
      isEffective: boolean
      hasCurrentProducts: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recommendation"]>
    composites: {}
  }

  type RecommendationGetPayload<S extends boolean | null | undefined | RecommendationDefaultArgs> = $Result.GetResult<Prisma.$RecommendationPayload, S>

  type RecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecommendationCountAggregateInputType | true
    }

  export interface RecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recommendation'], meta: { name: 'Recommendation' } }
    /**
     * Find zero or one Recommendation that matches the filter.
     * @param {RecommendationFindUniqueArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecommendationFindUniqueArgs>(args: SelectSubset<T, RecommendationFindUniqueArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recommendation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecommendationFindUniqueOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecommendationFindUniqueOrThrowArgs>(args: SelectSubset<T, RecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecommendationFindFirstArgs>(args?: SelectSubset<T, RecommendationFindFirstArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecommendationFindFirstOrThrowArgs>(args?: SelectSubset<T, RecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recommendations
     * const recommendations = await prisma.recommendation.findMany()
     * 
     * // Get first 10 Recommendations
     * const recommendations = await prisma.recommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecommendationFindManyArgs>(args?: SelectSubset<T, RecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recommendation.
     * @param {RecommendationCreateArgs} args - Arguments to create a Recommendation.
     * @example
     * // Create one Recommendation
     * const Recommendation = await prisma.recommendation.create({
     *   data: {
     *     // ... data to create a Recommendation
     *   }
     * })
     * 
     */
    create<T extends RecommendationCreateArgs>(args: SelectSubset<T, RecommendationCreateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recommendations.
     * @param {RecommendationCreateManyArgs} args - Arguments to create many Recommendations.
     * @example
     * // Create many Recommendations
     * const recommendation = await prisma.recommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecommendationCreateManyArgs>(args?: SelectSubset<T, RecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recommendation.
     * @param {RecommendationDeleteArgs} args - Arguments to delete one Recommendation.
     * @example
     * // Delete one Recommendation
     * const Recommendation = await prisma.recommendation.delete({
     *   where: {
     *     // ... filter to delete one Recommendation
     *   }
     * })
     * 
     */
    delete<T extends RecommendationDeleteArgs>(args: SelectSubset<T, RecommendationDeleteArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recommendation.
     * @param {RecommendationUpdateArgs} args - Arguments to update one Recommendation.
     * @example
     * // Update one Recommendation
     * const recommendation = await prisma.recommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecommendationUpdateArgs>(args: SelectSubset<T, RecommendationUpdateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recommendations.
     * @param {RecommendationDeleteManyArgs} args - Arguments to filter Recommendations to delete.
     * @example
     * // Delete a few Recommendations
     * const { count } = await prisma.recommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecommendationDeleteManyArgs>(args?: SelectSubset<T, RecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recommendations
     * const recommendation = await prisma.recommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecommendationUpdateManyArgs>(args: SelectSubset<T, RecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recommendation.
     * @param {RecommendationUpsertArgs} args - Arguments to update or create a Recommendation.
     * @example
     * // Update or create a Recommendation
     * const recommendation = await prisma.recommendation.upsert({
     *   create: {
     *     // ... data to create a Recommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recommendation we want to update
     *   }
     * })
     */
    upsert<T extends RecommendationUpsertArgs>(args: SelectSubset<T, RecommendationUpsertArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationCountArgs} args - Arguments to filter Recommendations to count.
     * @example
     * // Count the number of Recommendations
     * const count = await prisma.recommendation.count({
     *   where: {
     *     // ... the filter for the Recommendations we want to count
     *   }
     * })
    **/
    count<T extends RecommendationCountArgs>(
      args?: Subset<T, RecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecommendationAggregateArgs>(args: Subset<T, RecommendationAggregateArgs>): Prisma.PrismaPromise<GetRecommendationAggregateType<T>>

    /**
     * Group by Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecommendationGroupByArgs['orderBy'] }
        : { orderBy?: RecommendationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recommendation model
   */
  readonly fields: RecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recommendation model
   */
  interface RecommendationFieldRefs {
    readonly id: FieldRef<"Recommendation", 'Int'>
    readonly profileId: FieldRef<"Recommendation", 'Int'>
    readonly routine: FieldRef<"Recommendation", 'String'>
    readonly products: FieldRef<"Recommendation", 'String'>
    readonly productAnalysis: FieldRef<"Recommendation", 'String'>
    readonly isEffective: FieldRef<"Recommendation", 'Boolean'>
    readonly hasCurrentProducts: FieldRef<"Recommendation", 'Boolean'>
    readonly createdAt: FieldRef<"Recommendation", 'DateTime'>
    readonly updatedAt: FieldRef<"Recommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recommendation findUnique
   */
  export type RecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findUniqueOrThrow
   */
  export type RecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findFirst
   */
  export type RecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findFirstOrThrow
   */
  export type RecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findMany
   */
  export type RecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendations to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation create
   */
  export type RecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a Recommendation.
     */
    data: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
  }

  /**
   * Recommendation createMany
   */
  export type RecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recommendations.
     */
    data: RecommendationCreateManyInput | RecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recommendation update
   */
  export type RecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a Recommendation.
     */
    data: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
    /**
     * Choose, which Recommendation to update.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation updateMany
   */
  export type RecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recommendations.
     */
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyInput>
    /**
     * Filter which Recommendations to update
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to update.
     */
    limit?: number
  }

  /**
   * Recommendation upsert
   */
  export type RecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the Recommendation to update in case it exists.
     */
    where: RecommendationWhereUniqueInput
    /**
     * In case the Recommendation found by the `where` argument doesn't exist, create a new Recommendation with this data.
     */
    create: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
    /**
     * In case the Recommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
  }

  /**
   * Recommendation delete
   */
  export type RecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter which Recommendation to delete.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation deleteMany
   */
  export type RecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendations to delete
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to delete.
     */
    limit?: number
  }

  /**
   * Recommendation without action
   */
  export type RecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    originalPrice: number | null
    rating: number | null
    reviewCount: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
    originalPrice: number | null
    rating: number | null
    reviewCount: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    brand: string | null
    category: string | null
    price: number | null
    originalPrice: number | null
    discount: string | null
    skinTypes: string | null
    skinGoals: string | null
    description: string | null
    howToUse: string | null
    availableAt: string | null
    rating: number | null
    reviewCount: number | null
    ingredients: string | null
    imageUrl: string | null
    productUrl: string | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    brand: string | null
    category: string | null
    price: number | null
    originalPrice: number | null
    discount: string | null
    skinTypes: string | null
    skinGoals: string | null
    description: string | null
    howToUse: string | null
    availableAt: string | null
    rating: number | null
    reviewCount: number | null
    ingredients: string | null
    imageUrl: string | null
    productUrl: string | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    brand: number
    category: number
    price: number
    originalPrice: number
    discount: number
    skinTypes: number
    skinGoals: number
    description: number
    howToUse: number
    availableAt: number
    rating: number
    reviewCount: number
    ingredients: number
    imageUrl: number
    productUrl: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    originalPrice?: true
    rating?: true
    reviewCount?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    originalPrice?: true
    rating?: true
    reviewCount?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    category?: true
    price?: true
    originalPrice?: true
    discount?: true
    skinTypes?: true
    skinGoals?: true
    description?: true
    howToUse?: true
    availableAt?: true
    rating?: true
    reviewCount?: true
    ingredients?: true
    imageUrl?: true
    productUrl?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    category?: true
    price?: true
    originalPrice?: true
    discount?: true
    skinTypes?: true
    skinGoals?: true
    description?: true
    howToUse?: true
    availableAt?: true
    rating?: true
    reviewCount?: true
    ingredients?: true
    imageUrl?: true
    productUrl?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    category?: true
    price?: true
    originalPrice?: true
    discount?: true
    skinTypes?: true
    skinGoals?: true
    description?: true
    howToUse?: true
    availableAt?: true
    rating?: true
    reviewCount?: true
    ingredients?: true
    imageUrl?: true
    productUrl?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    brand: string
    category: string
    price: number
    originalPrice: number
    discount: string | null
    skinTypes: string
    skinGoals: string
    description: string
    howToUse: string
    availableAt: string
    rating: number
    reviewCount: number
    ingredients: string | null
    imageUrl: string | null
    productUrl: string | null
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    brand?: boolean
    category?: boolean
    price?: boolean
    originalPrice?: boolean
    discount?: boolean
    skinTypes?: boolean
    skinGoals?: boolean
    description?: boolean
    howToUse?: boolean
    availableAt?: boolean
    rating?: boolean
    reviewCount?: boolean
    ingredients?: boolean
    imageUrl?: boolean
    productUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    brand?: boolean
    category?: boolean
    price?: boolean
    originalPrice?: boolean
    discount?: boolean
    skinTypes?: boolean
    skinGoals?: boolean
    description?: boolean
    howToUse?: boolean
    availableAt?: boolean
    rating?: boolean
    reviewCount?: boolean
    ingredients?: boolean
    imageUrl?: boolean
    productUrl?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "brand" | "category" | "price" | "originalPrice" | "discount" | "skinTypes" | "skinGoals" | "description" | "howToUse" | "availableAt" | "rating" | "reviewCount" | "ingredients" | "imageUrl" | "productUrl" | "createdAt", ExtArgs["result"]["product"]>

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      brand: string
      category: string
      price: number
      originalPrice: number
      discount: string | null
      skinTypes: string
      skinGoals: string
      description: string
      howToUse: string
      availableAt: string
      rating: number
      reviewCount: number
      ingredients: string | null
      imageUrl: string | null
      productUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly brand: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly originalPrice: FieldRef<"Product", 'Float'>
    readonly discount: FieldRef<"Product", 'String'>
    readonly skinTypes: FieldRef<"Product", 'String'>
    readonly skinGoals: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly howToUse: FieldRef<"Product", 'String'>
    readonly availableAt: FieldRef<"Product", 'String'>
    readonly rating: FieldRef<"Product", 'Float'>
    readonly reviewCount: FieldRef<"Product", 'Int'>
    readonly ingredients: FieldRef<"Product", 'String'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly productUrl: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
  }


  /**
   * Model SkincareLog
   */

  export type AggregateSkincareLog = {
    _count: SkincareLogCountAggregateOutputType | null
    _avg: SkincareLogAvgAggregateOutputType | null
    _sum: SkincareLogSumAggregateOutputType | null
    _min: SkincareLogMinAggregateOutputType | null
    _max: SkincareLogMaxAggregateOutputType | null
  }

  export type SkincareLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SkincareLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SkincareLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    timeOfDay: string | null
    productsUsed: string | null
    notes: string | null
    photo: string | null
    createdAt: Date | null
  }

  export type SkincareLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    timeOfDay: string | null
    productsUsed: string | null
    notes: string | null
    photo: string | null
    createdAt: Date | null
  }

  export type SkincareLogCountAggregateOutputType = {
    id: number
    userId: number
    timeOfDay: number
    productsUsed: number
    notes: number
    photo: number
    createdAt: number
    _all: number
  }


  export type SkincareLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SkincareLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SkincareLogMinAggregateInputType = {
    id?: true
    userId?: true
    timeOfDay?: true
    productsUsed?: true
    notes?: true
    photo?: true
    createdAt?: true
  }

  export type SkincareLogMaxAggregateInputType = {
    id?: true
    userId?: true
    timeOfDay?: true
    productsUsed?: true
    notes?: true
    photo?: true
    createdAt?: true
  }

  export type SkincareLogCountAggregateInputType = {
    id?: true
    userId?: true
    timeOfDay?: true
    productsUsed?: true
    notes?: true
    photo?: true
    createdAt?: true
    _all?: true
  }

  export type SkincareLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkincareLog to aggregate.
     */
    where?: SkincareLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkincareLogs to fetch.
     */
    orderBy?: SkincareLogOrderByWithRelationInput | SkincareLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkincareLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkincareLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkincareLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkincareLogs
    **/
    _count?: true | SkincareLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkincareLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkincareLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkincareLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkincareLogMaxAggregateInputType
  }

  export type GetSkincareLogAggregateType<T extends SkincareLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSkincareLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkincareLog[P]>
      : GetScalarType<T[P], AggregateSkincareLog[P]>
  }




  export type SkincareLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkincareLogWhereInput
    orderBy?: SkincareLogOrderByWithAggregationInput | SkincareLogOrderByWithAggregationInput[]
    by: SkincareLogScalarFieldEnum[] | SkincareLogScalarFieldEnum
    having?: SkincareLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkincareLogCountAggregateInputType | true
    _avg?: SkincareLogAvgAggregateInputType
    _sum?: SkincareLogSumAggregateInputType
    _min?: SkincareLogMinAggregateInputType
    _max?: SkincareLogMaxAggregateInputType
  }

  export type SkincareLogGroupByOutputType = {
    id: number
    userId: number
    timeOfDay: string
    productsUsed: string
    notes: string | null
    photo: string | null
    createdAt: Date
    _count: SkincareLogCountAggregateOutputType | null
    _avg: SkincareLogAvgAggregateOutputType | null
    _sum: SkincareLogSumAggregateOutputType | null
    _min: SkincareLogMinAggregateOutputType | null
    _max: SkincareLogMaxAggregateOutputType | null
  }

  type GetSkincareLogGroupByPayload<T extends SkincareLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkincareLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkincareLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkincareLogGroupByOutputType[P]>
            : GetScalarType<T[P], SkincareLogGroupByOutputType[P]>
        }
      >
    >


  export type SkincareLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeOfDay?: boolean
    productsUsed?: boolean
    notes?: boolean
    photo?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skincareLog"]>



  export type SkincareLogSelectScalar = {
    id?: boolean
    userId?: boolean
    timeOfDay?: boolean
    productsUsed?: boolean
    notes?: boolean
    photo?: boolean
    createdAt?: boolean
  }

  export type SkincareLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "timeOfDay" | "productsUsed" | "notes" | "photo" | "createdAt", ExtArgs["result"]["skincareLog"]>
  export type SkincareLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SkincareLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkincareLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      timeOfDay: string
      productsUsed: string
      notes: string | null
      photo: string | null
      createdAt: Date
    }, ExtArgs["result"]["skincareLog"]>
    composites: {}
  }

  type SkincareLogGetPayload<S extends boolean | null | undefined | SkincareLogDefaultArgs> = $Result.GetResult<Prisma.$SkincareLogPayload, S>

  type SkincareLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkincareLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkincareLogCountAggregateInputType | true
    }

  export interface SkincareLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkincareLog'], meta: { name: 'SkincareLog' } }
    /**
     * Find zero or one SkincareLog that matches the filter.
     * @param {SkincareLogFindUniqueArgs} args - Arguments to find a SkincareLog
     * @example
     * // Get one SkincareLog
     * const skincareLog = await prisma.skincareLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkincareLogFindUniqueArgs>(args: SelectSubset<T, SkincareLogFindUniqueArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkincareLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkincareLogFindUniqueOrThrowArgs} args - Arguments to find a SkincareLog
     * @example
     * // Get one SkincareLog
     * const skincareLog = await prisma.skincareLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkincareLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SkincareLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkincareLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogFindFirstArgs} args - Arguments to find a SkincareLog
     * @example
     * // Get one SkincareLog
     * const skincareLog = await prisma.skincareLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkincareLogFindFirstArgs>(args?: SelectSubset<T, SkincareLogFindFirstArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkincareLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogFindFirstOrThrowArgs} args - Arguments to find a SkincareLog
     * @example
     * // Get one SkincareLog
     * const skincareLog = await prisma.skincareLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkincareLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SkincareLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkincareLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkincareLogs
     * const skincareLogs = await prisma.skincareLog.findMany()
     * 
     * // Get first 10 SkincareLogs
     * const skincareLogs = await prisma.skincareLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skincareLogWithIdOnly = await prisma.skincareLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkincareLogFindManyArgs>(args?: SelectSubset<T, SkincareLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkincareLog.
     * @param {SkincareLogCreateArgs} args - Arguments to create a SkincareLog.
     * @example
     * // Create one SkincareLog
     * const SkincareLog = await prisma.skincareLog.create({
     *   data: {
     *     // ... data to create a SkincareLog
     *   }
     * })
     * 
     */
    create<T extends SkincareLogCreateArgs>(args: SelectSubset<T, SkincareLogCreateArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkincareLogs.
     * @param {SkincareLogCreateManyArgs} args - Arguments to create many SkincareLogs.
     * @example
     * // Create many SkincareLogs
     * const skincareLog = await prisma.skincareLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkincareLogCreateManyArgs>(args?: SelectSubset<T, SkincareLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SkincareLog.
     * @param {SkincareLogDeleteArgs} args - Arguments to delete one SkincareLog.
     * @example
     * // Delete one SkincareLog
     * const SkincareLog = await prisma.skincareLog.delete({
     *   where: {
     *     // ... filter to delete one SkincareLog
     *   }
     * })
     * 
     */
    delete<T extends SkincareLogDeleteArgs>(args: SelectSubset<T, SkincareLogDeleteArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkincareLog.
     * @param {SkincareLogUpdateArgs} args - Arguments to update one SkincareLog.
     * @example
     * // Update one SkincareLog
     * const skincareLog = await prisma.skincareLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkincareLogUpdateArgs>(args: SelectSubset<T, SkincareLogUpdateArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkincareLogs.
     * @param {SkincareLogDeleteManyArgs} args - Arguments to filter SkincareLogs to delete.
     * @example
     * // Delete a few SkincareLogs
     * const { count } = await prisma.skincareLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkincareLogDeleteManyArgs>(args?: SelectSubset<T, SkincareLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkincareLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkincareLogs
     * const skincareLog = await prisma.skincareLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkincareLogUpdateManyArgs>(args: SelectSubset<T, SkincareLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SkincareLog.
     * @param {SkincareLogUpsertArgs} args - Arguments to update or create a SkincareLog.
     * @example
     * // Update or create a SkincareLog
     * const skincareLog = await prisma.skincareLog.upsert({
     *   create: {
     *     // ... data to create a SkincareLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkincareLog we want to update
     *   }
     * })
     */
    upsert<T extends SkincareLogUpsertArgs>(args: SelectSubset<T, SkincareLogUpsertArgs<ExtArgs>>): Prisma__SkincareLogClient<$Result.GetResult<Prisma.$SkincareLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SkincareLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogCountArgs} args - Arguments to filter SkincareLogs to count.
     * @example
     * // Count the number of SkincareLogs
     * const count = await prisma.skincareLog.count({
     *   where: {
     *     // ... the filter for the SkincareLogs we want to count
     *   }
     * })
    **/
    count<T extends SkincareLogCountArgs>(
      args?: Subset<T, SkincareLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkincareLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkincareLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkincareLogAggregateArgs>(args: Subset<T, SkincareLogAggregateArgs>): Prisma.PrismaPromise<GetSkincareLogAggregateType<T>>

    /**
     * Group by SkincareLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkincareLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkincareLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkincareLogGroupByArgs['orderBy'] }
        : { orderBy?: SkincareLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkincareLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkincareLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkincareLog model
   */
  readonly fields: SkincareLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkincareLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkincareLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkincareLog model
   */
  interface SkincareLogFieldRefs {
    readonly id: FieldRef<"SkincareLog", 'Int'>
    readonly userId: FieldRef<"SkincareLog", 'Int'>
    readonly timeOfDay: FieldRef<"SkincareLog", 'String'>
    readonly productsUsed: FieldRef<"SkincareLog", 'String'>
    readonly notes: FieldRef<"SkincareLog", 'String'>
    readonly photo: FieldRef<"SkincareLog", 'String'>
    readonly createdAt: FieldRef<"SkincareLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SkincareLog findUnique
   */
  export type SkincareLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter, which SkincareLog to fetch.
     */
    where: SkincareLogWhereUniqueInput
  }

  /**
   * SkincareLog findUniqueOrThrow
   */
  export type SkincareLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter, which SkincareLog to fetch.
     */
    where: SkincareLogWhereUniqueInput
  }

  /**
   * SkincareLog findFirst
   */
  export type SkincareLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter, which SkincareLog to fetch.
     */
    where?: SkincareLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkincareLogs to fetch.
     */
    orderBy?: SkincareLogOrderByWithRelationInput | SkincareLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkincareLogs.
     */
    cursor?: SkincareLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkincareLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkincareLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkincareLogs.
     */
    distinct?: SkincareLogScalarFieldEnum | SkincareLogScalarFieldEnum[]
  }

  /**
   * SkincareLog findFirstOrThrow
   */
  export type SkincareLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter, which SkincareLog to fetch.
     */
    where?: SkincareLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkincareLogs to fetch.
     */
    orderBy?: SkincareLogOrderByWithRelationInput | SkincareLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkincareLogs.
     */
    cursor?: SkincareLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkincareLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkincareLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkincareLogs.
     */
    distinct?: SkincareLogScalarFieldEnum | SkincareLogScalarFieldEnum[]
  }

  /**
   * SkincareLog findMany
   */
  export type SkincareLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter, which SkincareLogs to fetch.
     */
    where?: SkincareLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkincareLogs to fetch.
     */
    orderBy?: SkincareLogOrderByWithRelationInput | SkincareLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkincareLogs.
     */
    cursor?: SkincareLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkincareLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkincareLogs.
     */
    skip?: number
    distinct?: SkincareLogScalarFieldEnum | SkincareLogScalarFieldEnum[]
  }

  /**
   * SkincareLog create
   */
  export type SkincareLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SkincareLog.
     */
    data: XOR<SkincareLogCreateInput, SkincareLogUncheckedCreateInput>
  }

  /**
   * SkincareLog createMany
   */
  export type SkincareLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkincareLogs.
     */
    data: SkincareLogCreateManyInput | SkincareLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SkincareLog update
   */
  export type SkincareLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SkincareLog.
     */
    data: XOR<SkincareLogUpdateInput, SkincareLogUncheckedUpdateInput>
    /**
     * Choose, which SkincareLog to update.
     */
    where: SkincareLogWhereUniqueInput
  }

  /**
   * SkincareLog updateMany
   */
  export type SkincareLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkincareLogs.
     */
    data: XOR<SkincareLogUpdateManyMutationInput, SkincareLogUncheckedUpdateManyInput>
    /**
     * Filter which SkincareLogs to update
     */
    where?: SkincareLogWhereInput
    /**
     * Limit how many SkincareLogs to update.
     */
    limit?: number
  }

  /**
   * SkincareLog upsert
   */
  export type SkincareLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SkincareLog to update in case it exists.
     */
    where: SkincareLogWhereUniqueInput
    /**
     * In case the SkincareLog found by the `where` argument doesn't exist, create a new SkincareLog with this data.
     */
    create: XOR<SkincareLogCreateInput, SkincareLogUncheckedCreateInput>
    /**
     * In case the SkincareLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkincareLogUpdateInput, SkincareLogUncheckedUpdateInput>
  }

  /**
   * SkincareLog delete
   */
  export type SkincareLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
    /**
     * Filter which SkincareLog to delete.
     */
    where: SkincareLogWhereUniqueInput
  }

  /**
   * SkincareLog deleteMany
   */
  export type SkincareLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkincareLogs to delete
     */
    where?: SkincareLogWhereInput
    /**
     * Limit how many SkincareLogs to delete.
     */
    limit?: number
  }

  /**
   * SkincareLog without action
   */
  export type SkincareLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkincareLog
     */
    select?: SkincareLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkincareLog
     */
    omit?: SkincareLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkincareLogInclude<ExtArgs> | null
  }


  /**
   * Model Ingredient_Conflict
   */

  export type AggregateIngredient_Conflict = {
    _count: Ingredient_ConflictCountAggregateOutputType | null
    _avg: Ingredient_ConflictAvgAggregateOutputType | null
    _sum: Ingredient_ConflictSumAggregateOutputType | null
    _min: Ingredient_ConflictMinAggregateOutputType | null
    _max: Ingredient_ConflictMaxAggregateOutputType | null
  }

  export type Ingredient_ConflictAvgAggregateOutputType = {
    id: number | null
  }

  export type Ingredient_ConflictSumAggregateOutputType = {
    id: number | null
  }

  export type Ingredient_ConflictMinAggregateOutputType = {
    id: number | null
    ingredientA: string | null
    ingredientB: string | null
    severityLevel: string | null
    warningMessage: string | null
    createdAt: Date | null
  }

  export type Ingredient_ConflictMaxAggregateOutputType = {
    id: number | null
    ingredientA: string | null
    ingredientB: string | null
    severityLevel: string | null
    warningMessage: string | null
    createdAt: Date | null
  }

  export type Ingredient_ConflictCountAggregateOutputType = {
    id: number
    ingredientA: number
    ingredientB: number
    severityLevel: number
    warningMessage: number
    createdAt: number
    _all: number
  }


  export type Ingredient_ConflictAvgAggregateInputType = {
    id?: true
  }

  export type Ingredient_ConflictSumAggregateInputType = {
    id?: true
  }

  export type Ingredient_ConflictMinAggregateInputType = {
    id?: true
    ingredientA?: true
    ingredientB?: true
    severityLevel?: true
    warningMessage?: true
    createdAt?: true
  }

  export type Ingredient_ConflictMaxAggregateInputType = {
    id?: true
    ingredientA?: true
    ingredientB?: true
    severityLevel?: true
    warningMessage?: true
    createdAt?: true
  }

  export type Ingredient_ConflictCountAggregateInputType = {
    id?: true
    ingredientA?: true
    ingredientB?: true
    severityLevel?: true
    warningMessage?: true
    createdAt?: true
    _all?: true
  }

  export type Ingredient_ConflictAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient_Conflict to aggregate.
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_Conflicts to fetch.
     */
    orderBy?: Ingredient_ConflictOrderByWithRelationInput | Ingredient_ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Ingredient_ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingredient_Conflicts
    **/
    _count?: true | Ingredient_ConflictCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Ingredient_ConflictAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Ingredient_ConflictSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ingredient_ConflictMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ingredient_ConflictMaxAggregateInputType
  }

  export type GetIngredient_ConflictAggregateType<T extends Ingredient_ConflictAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredient_Conflict]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredient_Conflict[P]>
      : GetScalarType<T[P], AggregateIngredient_Conflict[P]>
  }




  export type Ingredient_ConflictGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Ingredient_ConflictWhereInput
    orderBy?: Ingredient_ConflictOrderByWithAggregationInput | Ingredient_ConflictOrderByWithAggregationInput[]
    by: Ingredient_ConflictScalarFieldEnum[] | Ingredient_ConflictScalarFieldEnum
    having?: Ingredient_ConflictScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ingredient_ConflictCountAggregateInputType | true
    _avg?: Ingredient_ConflictAvgAggregateInputType
    _sum?: Ingredient_ConflictSumAggregateInputType
    _min?: Ingredient_ConflictMinAggregateInputType
    _max?: Ingredient_ConflictMaxAggregateInputType
  }

  export type Ingredient_ConflictGroupByOutputType = {
    id: number
    ingredientA: string
    ingredientB: string
    severityLevel: string
    warningMessage: string
    createdAt: Date
    _count: Ingredient_ConflictCountAggregateOutputType | null
    _avg: Ingredient_ConflictAvgAggregateOutputType | null
    _sum: Ingredient_ConflictSumAggregateOutputType | null
    _min: Ingredient_ConflictMinAggregateOutputType | null
    _max: Ingredient_ConflictMaxAggregateOutputType | null
  }

  type GetIngredient_ConflictGroupByPayload<T extends Ingredient_ConflictGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ingredient_ConflictGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ingredient_ConflictGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ingredient_ConflictGroupByOutputType[P]>
            : GetScalarType<T[P], Ingredient_ConflictGroupByOutputType[P]>
        }
      >
    >


  export type Ingredient_ConflictSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ingredientA?: boolean
    ingredientB?: boolean
    severityLevel?: boolean
    warningMessage?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ingredient_Conflict"]>



  export type Ingredient_ConflictSelectScalar = {
    id?: boolean
    ingredientA?: boolean
    ingredientB?: boolean
    severityLevel?: boolean
    warningMessage?: boolean
    createdAt?: boolean
  }

  export type Ingredient_ConflictOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ingredientA" | "ingredientB" | "severityLevel" | "warningMessage" | "createdAt", ExtArgs["result"]["ingredient_Conflict"]>

  export type $Ingredient_ConflictPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ingredient_Conflict"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ingredientA: string
      ingredientB: string
      severityLevel: string
      warningMessage: string
      createdAt: Date
    }, ExtArgs["result"]["ingredient_Conflict"]>
    composites: {}
  }

  type Ingredient_ConflictGetPayload<S extends boolean | null | undefined | Ingredient_ConflictDefaultArgs> = $Result.GetResult<Prisma.$Ingredient_ConflictPayload, S>

  type Ingredient_ConflictCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Ingredient_ConflictFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Ingredient_ConflictCountAggregateInputType | true
    }

  export interface Ingredient_ConflictDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingredient_Conflict'], meta: { name: 'Ingredient_Conflict' } }
    /**
     * Find zero or one Ingredient_Conflict that matches the filter.
     * @param {Ingredient_ConflictFindUniqueArgs} args - Arguments to find a Ingredient_Conflict
     * @example
     * // Get one Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Ingredient_ConflictFindUniqueArgs>(args: SelectSubset<T, Ingredient_ConflictFindUniqueArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ingredient_Conflict that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Ingredient_ConflictFindUniqueOrThrowArgs} args - Arguments to find a Ingredient_Conflict
     * @example
     * // Get one Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Ingredient_ConflictFindUniqueOrThrowArgs>(args: SelectSubset<T, Ingredient_ConflictFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredient_Conflict that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictFindFirstArgs} args - Arguments to find a Ingredient_Conflict
     * @example
     * // Get one Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Ingredient_ConflictFindFirstArgs>(args?: SelectSubset<T, Ingredient_ConflictFindFirstArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredient_Conflict that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictFindFirstOrThrowArgs} args - Arguments to find a Ingredient_Conflict
     * @example
     * // Get one Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Ingredient_ConflictFindFirstOrThrowArgs>(args?: SelectSubset<T, Ingredient_ConflictFindFirstOrThrowArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ingredient_Conflicts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredient_Conflicts
     * const ingredient_Conflicts = await prisma.ingredient_Conflict.findMany()
     * 
     * // Get first 10 Ingredient_Conflicts
     * const ingredient_Conflicts = await prisma.ingredient_Conflict.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingredient_ConflictWithIdOnly = await prisma.ingredient_Conflict.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Ingredient_ConflictFindManyArgs>(args?: SelectSubset<T, Ingredient_ConflictFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ingredient_Conflict.
     * @param {Ingredient_ConflictCreateArgs} args - Arguments to create a Ingredient_Conflict.
     * @example
     * // Create one Ingredient_Conflict
     * const Ingredient_Conflict = await prisma.ingredient_Conflict.create({
     *   data: {
     *     // ... data to create a Ingredient_Conflict
     *   }
     * })
     * 
     */
    create<T extends Ingredient_ConflictCreateArgs>(args: SelectSubset<T, Ingredient_ConflictCreateArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ingredient_Conflicts.
     * @param {Ingredient_ConflictCreateManyArgs} args - Arguments to create many Ingredient_Conflicts.
     * @example
     * // Create many Ingredient_Conflicts
     * const ingredient_Conflict = await prisma.ingredient_Conflict.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Ingredient_ConflictCreateManyArgs>(args?: SelectSubset<T, Ingredient_ConflictCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ingredient_Conflict.
     * @param {Ingredient_ConflictDeleteArgs} args - Arguments to delete one Ingredient_Conflict.
     * @example
     * // Delete one Ingredient_Conflict
     * const Ingredient_Conflict = await prisma.ingredient_Conflict.delete({
     *   where: {
     *     // ... filter to delete one Ingredient_Conflict
     *   }
     * })
     * 
     */
    delete<T extends Ingredient_ConflictDeleteArgs>(args: SelectSubset<T, Ingredient_ConflictDeleteArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ingredient_Conflict.
     * @param {Ingredient_ConflictUpdateArgs} args - Arguments to update one Ingredient_Conflict.
     * @example
     * // Update one Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Ingredient_ConflictUpdateArgs>(args: SelectSubset<T, Ingredient_ConflictUpdateArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ingredient_Conflicts.
     * @param {Ingredient_ConflictDeleteManyArgs} args - Arguments to filter Ingredient_Conflicts to delete.
     * @example
     * // Delete a few Ingredient_Conflicts
     * const { count } = await prisma.ingredient_Conflict.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Ingredient_ConflictDeleteManyArgs>(args?: SelectSubset<T, Ingredient_ConflictDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredient_Conflicts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredient_Conflicts
     * const ingredient_Conflict = await prisma.ingredient_Conflict.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Ingredient_ConflictUpdateManyArgs>(args: SelectSubset<T, Ingredient_ConflictUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ingredient_Conflict.
     * @param {Ingredient_ConflictUpsertArgs} args - Arguments to update or create a Ingredient_Conflict.
     * @example
     * // Update or create a Ingredient_Conflict
     * const ingredient_Conflict = await prisma.ingredient_Conflict.upsert({
     *   create: {
     *     // ... data to create a Ingredient_Conflict
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredient_Conflict we want to update
     *   }
     * })
     */
    upsert<T extends Ingredient_ConflictUpsertArgs>(args: SelectSubset<T, Ingredient_ConflictUpsertArgs<ExtArgs>>): Prisma__Ingredient_ConflictClient<$Result.GetResult<Prisma.$Ingredient_ConflictPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ingredient_Conflicts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictCountArgs} args - Arguments to filter Ingredient_Conflicts to count.
     * @example
     * // Count the number of Ingredient_Conflicts
     * const count = await prisma.ingredient_Conflict.count({
     *   where: {
     *     // ... the filter for the Ingredient_Conflicts we want to count
     *   }
     * })
    **/
    count<T extends Ingredient_ConflictCountArgs>(
      args?: Subset<T, Ingredient_ConflictCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ingredient_ConflictCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredient_Conflict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Ingredient_ConflictAggregateArgs>(args: Subset<T, Ingredient_ConflictAggregateArgs>): Prisma.PrismaPromise<GetIngredient_ConflictAggregateType<T>>

    /**
     * Group by Ingredient_Conflict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_ConflictGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Ingredient_ConflictGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Ingredient_ConflictGroupByArgs['orderBy'] }
        : { orderBy?: Ingredient_ConflictGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Ingredient_ConflictGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredient_ConflictGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingredient_Conflict model
   */
  readonly fields: Ingredient_ConflictFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredient_Conflict.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Ingredient_ConflictClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ingredient_Conflict model
   */
  interface Ingredient_ConflictFieldRefs {
    readonly id: FieldRef<"Ingredient_Conflict", 'Int'>
    readonly ingredientA: FieldRef<"Ingredient_Conflict", 'String'>
    readonly ingredientB: FieldRef<"Ingredient_Conflict", 'String'>
    readonly severityLevel: FieldRef<"Ingredient_Conflict", 'String'>
    readonly warningMessage: FieldRef<"Ingredient_Conflict", 'String'>
    readonly createdAt: FieldRef<"Ingredient_Conflict", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ingredient_Conflict findUnique
   */
  export type Ingredient_ConflictFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter, which Ingredient_Conflict to fetch.
     */
    where: Ingredient_ConflictWhereUniqueInput
  }

  /**
   * Ingredient_Conflict findUniqueOrThrow
   */
  export type Ingredient_ConflictFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter, which Ingredient_Conflict to fetch.
     */
    where: Ingredient_ConflictWhereUniqueInput
  }

  /**
   * Ingredient_Conflict findFirst
   */
  export type Ingredient_ConflictFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter, which Ingredient_Conflict to fetch.
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_Conflicts to fetch.
     */
    orderBy?: Ingredient_ConflictOrderByWithRelationInput | Ingredient_ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_Conflicts.
     */
    cursor?: Ingredient_ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_Conflicts.
     */
    distinct?: Ingredient_ConflictScalarFieldEnum | Ingredient_ConflictScalarFieldEnum[]
  }

  /**
   * Ingredient_Conflict findFirstOrThrow
   */
  export type Ingredient_ConflictFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter, which Ingredient_Conflict to fetch.
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_Conflicts to fetch.
     */
    orderBy?: Ingredient_ConflictOrderByWithRelationInput | Ingredient_ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_Conflicts.
     */
    cursor?: Ingredient_ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_Conflicts.
     */
    distinct?: Ingredient_ConflictScalarFieldEnum | Ingredient_ConflictScalarFieldEnum[]
  }

  /**
   * Ingredient_Conflict findMany
   */
  export type Ingredient_ConflictFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter, which Ingredient_Conflicts to fetch.
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_Conflicts to fetch.
     */
    orderBy?: Ingredient_ConflictOrderByWithRelationInput | Ingredient_ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredient_Conflicts.
     */
    cursor?: Ingredient_ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_Conflicts.
     */
    skip?: number
    distinct?: Ingredient_ConflictScalarFieldEnum | Ingredient_ConflictScalarFieldEnum[]
  }

  /**
   * Ingredient_Conflict create
   */
  export type Ingredient_ConflictCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * The data needed to create a Ingredient_Conflict.
     */
    data: XOR<Ingredient_ConflictCreateInput, Ingredient_ConflictUncheckedCreateInput>
  }

  /**
   * Ingredient_Conflict createMany
   */
  export type Ingredient_ConflictCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredient_Conflicts.
     */
    data: Ingredient_ConflictCreateManyInput | Ingredient_ConflictCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ingredient_Conflict update
   */
  export type Ingredient_ConflictUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * The data needed to update a Ingredient_Conflict.
     */
    data: XOR<Ingredient_ConflictUpdateInput, Ingredient_ConflictUncheckedUpdateInput>
    /**
     * Choose, which Ingredient_Conflict to update.
     */
    where: Ingredient_ConflictWhereUniqueInput
  }

  /**
   * Ingredient_Conflict updateMany
   */
  export type Ingredient_ConflictUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredient_Conflicts.
     */
    data: XOR<Ingredient_ConflictUpdateManyMutationInput, Ingredient_ConflictUncheckedUpdateManyInput>
    /**
     * Filter which Ingredient_Conflicts to update
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * Limit how many Ingredient_Conflicts to update.
     */
    limit?: number
  }

  /**
   * Ingredient_Conflict upsert
   */
  export type Ingredient_ConflictUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * The filter to search for the Ingredient_Conflict to update in case it exists.
     */
    where: Ingredient_ConflictWhereUniqueInput
    /**
     * In case the Ingredient_Conflict found by the `where` argument doesn't exist, create a new Ingredient_Conflict with this data.
     */
    create: XOR<Ingredient_ConflictCreateInput, Ingredient_ConflictUncheckedCreateInput>
    /**
     * In case the Ingredient_Conflict was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Ingredient_ConflictUpdateInput, Ingredient_ConflictUncheckedUpdateInput>
  }

  /**
   * Ingredient_Conflict delete
   */
  export type Ingredient_ConflictDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
    /**
     * Filter which Ingredient_Conflict to delete.
     */
    where: Ingredient_ConflictWhereUniqueInput
  }

  /**
   * Ingredient_Conflict deleteMany
   */
  export type Ingredient_ConflictDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient_Conflicts to delete
     */
    where?: Ingredient_ConflictWhereInput
    /**
     * Limit how many Ingredient_Conflicts to delete.
     */
    limit?: number
  }

  /**
   * Ingredient_Conflict without action
   */
  export type Ingredient_ConflictDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_Conflict
     */
    select?: Ingredient_ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient_Conflict
     */
    omit?: Ingredient_ConflictOmit<ExtArgs> | null
  }


  /**
   * Model CommunityPost
   */

  export type AggregateCommunityPost = {
    _count: CommunityPostCountAggregateOutputType | null
    _avg: CommunityPostAvgAggregateOutputType | null
    _sum: CommunityPostSumAggregateOutputType | null
    _min: CommunityPostMinAggregateOutputType | null
    _max: CommunityPostMaxAggregateOutputType | null
  }

  export type CommunityPostAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    likes: number | null
  }

  export type CommunityPostSumAggregateOutputType = {
    id: number | null
    userId: number | null
    likes: number | null
  }

  export type CommunityPostMinAggregateOutputType = {
    id: number | null
    userId: number | null
    question: string | null
    details: string | null
    category: string | null
    skinType: string | null
    isAnonymous: boolean | null
    likes: number | null
    createdAt: Date | null
  }

  export type CommunityPostMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    question: string | null
    details: string | null
    category: string | null
    skinType: string | null
    isAnonymous: boolean | null
    likes: number | null
    createdAt: Date | null
  }

  export type CommunityPostCountAggregateOutputType = {
    id: number
    userId: number
    question: number
    details: number
    category: number
    skinType: number
    isAnonymous: number
    likes: number
    createdAt: number
    _all: number
  }


  export type CommunityPostAvgAggregateInputType = {
    id?: true
    userId?: true
    likes?: true
  }

  export type CommunityPostSumAggregateInputType = {
    id?: true
    userId?: true
    likes?: true
  }

  export type CommunityPostMinAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    details?: true
    category?: true
    skinType?: true
    isAnonymous?: true
    likes?: true
    createdAt?: true
  }

  export type CommunityPostMaxAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    details?: true
    category?: true
    skinType?: true
    isAnonymous?: true
    likes?: true
    createdAt?: true
  }

  export type CommunityPostCountAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    details?: true
    category?: true
    skinType?: true
    isAnonymous?: true
    likes?: true
    createdAt?: true
    _all?: true
  }

  export type CommunityPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityPost to aggregate.
     */
    where?: CommunityPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityPosts to fetch.
     */
    orderBy?: CommunityPostOrderByWithRelationInput | CommunityPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommunityPosts
    **/
    _count?: true | CommunityPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommunityPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommunityPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityPostMaxAggregateInputType
  }

  export type GetCommunityPostAggregateType<T extends CommunityPostAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunityPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunityPost[P]>
      : GetScalarType<T[P], AggregateCommunityPost[P]>
  }




  export type CommunityPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityPostWhereInput
    orderBy?: CommunityPostOrderByWithAggregationInput | CommunityPostOrderByWithAggregationInput[]
    by: CommunityPostScalarFieldEnum[] | CommunityPostScalarFieldEnum
    having?: CommunityPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityPostCountAggregateInputType | true
    _avg?: CommunityPostAvgAggregateInputType
    _sum?: CommunityPostSumAggregateInputType
    _min?: CommunityPostMinAggregateInputType
    _max?: CommunityPostMaxAggregateInputType
  }

  export type CommunityPostGroupByOutputType = {
    id: number
    userId: number
    question: string
    details: string | null
    category: string
    skinType: string | null
    isAnonymous: boolean
    likes: number
    createdAt: Date
    _count: CommunityPostCountAggregateOutputType | null
    _avg: CommunityPostAvgAggregateOutputType | null
    _sum: CommunityPostSumAggregateOutputType | null
    _min: CommunityPostMinAggregateOutputType | null
    _max: CommunityPostMaxAggregateOutputType | null
  }

  type GetCommunityPostGroupByPayload<T extends CommunityPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityPostGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityPostGroupByOutputType[P]>
        }
      >
    >


  export type CommunityPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    question?: boolean
    details?: boolean
    category?: boolean
    skinType?: boolean
    isAnonymous?: boolean
    likes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    answers?: boolean | CommunityPost$answersArgs<ExtArgs>
    _count?: boolean | CommunityPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityPost"]>



  export type CommunityPostSelectScalar = {
    id?: boolean
    userId?: boolean
    question?: boolean
    details?: boolean
    category?: boolean
    skinType?: boolean
    isAnonymous?: boolean
    likes?: boolean
    createdAt?: boolean
  }

  export type CommunityPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "question" | "details" | "category" | "skinType" | "isAnonymous" | "likes" | "createdAt", ExtArgs["result"]["communityPost"]>
  export type CommunityPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    answers?: boolean | CommunityPost$answersArgs<ExtArgs>
    _count?: boolean | CommunityPostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CommunityPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommunityPost"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      answers: Prisma.$CommunityAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      question: string
      details: string | null
      category: string
      skinType: string | null
      isAnonymous: boolean
      likes: number
      createdAt: Date
    }, ExtArgs["result"]["communityPost"]>
    composites: {}
  }

  type CommunityPostGetPayload<S extends boolean | null | undefined | CommunityPostDefaultArgs> = $Result.GetResult<Prisma.$CommunityPostPayload, S>

  type CommunityPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommunityPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommunityPostCountAggregateInputType | true
    }

  export interface CommunityPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommunityPost'], meta: { name: 'CommunityPost' } }
    /**
     * Find zero or one CommunityPost that matches the filter.
     * @param {CommunityPostFindUniqueArgs} args - Arguments to find a CommunityPost
     * @example
     * // Get one CommunityPost
     * const communityPost = await prisma.communityPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityPostFindUniqueArgs>(args: SelectSubset<T, CommunityPostFindUniqueArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommunityPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommunityPostFindUniqueOrThrowArgs} args - Arguments to find a CommunityPost
     * @example
     * // Get one CommunityPost
     * const communityPost = await prisma.communityPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityPostFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostFindFirstArgs} args - Arguments to find a CommunityPost
     * @example
     * // Get one CommunityPost
     * const communityPost = await prisma.communityPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityPostFindFirstArgs>(args?: SelectSubset<T, CommunityPostFindFirstArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostFindFirstOrThrowArgs} args - Arguments to find a CommunityPost
     * @example
     * // Get one CommunityPost
     * const communityPost = await prisma.communityPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityPostFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommunityPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommunityPosts
     * const communityPosts = await prisma.communityPost.findMany()
     * 
     * // Get first 10 CommunityPosts
     * const communityPosts = await prisma.communityPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityPostWithIdOnly = await prisma.communityPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityPostFindManyArgs>(args?: SelectSubset<T, CommunityPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommunityPost.
     * @param {CommunityPostCreateArgs} args - Arguments to create a CommunityPost.
     * @example
     * // Create one CommunityPost
     * const CommunityPost = await prisma.communityPost.create({
     *   data: {
     *     // ... data to create a CommunityPost
     *   }
     * })
     * 
     */
    create<T extends CommunityPostCreateArgs>(args: SelectSubset<T, CommunityPostCreateArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommunityPosts.
     * @param {CommunityPostCreateManyArgs} args - Arguments to create many CommunityPosts.
     * @example
     * // Create many CommunityPosts
     * const communityPost = await prisma.communityPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityPostCreateManyArgs>(args?: SelectSubset<T, CommunityPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CommunityPost.
     * @param {CommunityPostDeleteArgs} args - Arguments to delete one CommunityPost.
     * @example
     * // Delete one CommunityPost
     * const CommunityPost = await prisma.communityPost.delete({
     *   where: {
     *     // ... filter to delete one CommunityPost
     *   }
     * })
     * 
     */
    delete<T extends CommunityPostDeleteArgs>(args: SelectSubset<T, CommunityPostDeleteArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommunityPost.
     * @param {CommunityPostUpdateArgs} args - Arguments to update one CommunityPost.
     * @example
     * // Update one CommunityPost
     * const communityPost = await prisma.communityPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityPostUpdateArgs>(args: SelectSubset<T, CommunityPostUpdateArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommunityPosts.
     * @param {CommunityPostDeleteManyArgs} args - Arguments to filter CommunityPosts to delete.
     * @example
     * // Delete a few CommunityPosts
     * const { count } = await prisma.communityPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityPostDeleteManyArgs>(args?: SelectSubset<T, CommunityPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommunityPosts
     * const communityPost = await prisma.communityPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityPostUpdateManyArgs>(args: SelectSubset<T, CommunityPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommunityPost.
     * @param {CommunityPostUpsertArgs} args - Arguments to update or create a CommunityPost.
     * @example
     * // Update or create a CommunityPost
     * const communityPost = await prisma.communityPost.upsert({
     *   create: {
     *     // ... data to create a CommunityPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommunityPost we want to update
     *   }
     * })
     */
    upsert<T extends CommunityPostUpsertArgs>(args: SelectSubset<T, CommunityPostUpsertArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommunityPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostCountArgs} args - Arguments to filter CommunityPosts to count.
     * @example
     * // Count the number of CommunityPosts
     * const count = await prisma.communityPost.count({
     *   where: {
     *     // ... the filter for the CommunityPosts we want to count
     *   }
     * })
    **/
    count<T extends CommunityPostCountArgs>(
      args?: Subset<T, CommunityPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommunityPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityPostAggregateArgs>(args: Subset<T, CommunityPostAggregateArgs>): Prisma.PrismaPromise<GetCommunityPostAggregateType<T>>

    /**
     * Group by CommunityPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityPostGroupByArgs['orderBy'] }
        : { orderBy?: CommunityPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommunityPost model
   */
  readonly fields: CommunityPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommunityPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answers<T extends CommunityPost$answersArgs<ExtArgs> = {}>(args?: Subset<T, CommunityPost$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommunityPost model
   */
  interface CommunityPostFieldRefs {
    readonly id: FieldRef<"CommunityPost", 'Int'>
    readonly userId: FieldRef<"CommunityPost", 'Int'>
    readonly question: FieldRef<"CommunityPost", 'String'>
    readonly details: FieldRef<"CommunityPost", 'String'>
    readonly category: FieldRef<"CommunityPost", 'String'>
    readonly skinType: FieldRef<"CommunityPost", 'String'>
    readonly isAnonymous: FieldRef<"CommunityPost", 'Boolean'>
    readonly likes: FieldRef<"CommunityPost", 'Int'>
    readonly createdAt: FieldRef<"CommunityPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommunityPost findUnique
   */
  export type CommunityPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter, which CommunityPost to fetch.
     */
    where: CommunityPostWhereUniqueInput
  }

  /**
   * CommunityPost findUniqueOrThrow
   */
  export type CommunityPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter, which CommunityPost to fetch.
     */
    where: CommunityPostWhereUniqueInput
  }

  /**
   * CommunityPost findFirst
   */
  export type CommunityPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter, which CommunityPost to fetch.
     */
    where?: CommunityPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityPosts to fetch.
     */
    orderBy?: CommunityPostOrderByWithRelationInput | CommunityPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityPosts.
     */
    cursor?: CommunityPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityPosts.
     */
    distinct?: CommunityPostScalarFieldEnum | CommunityPostScalarFieldEnum[]
  }

  /**
   * CommunityPost findFirstOrThrow
   */
  export type CommunityPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter, which CommunityPost to fetch.
     */
    where?: CommunityPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityPosts to fetch.
     */
    orderBy?: CommunityPostOrderByWithRelationInput | CommunityPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityPosts.
     */
    cursor?: CommunityPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityPosts.
     */
    distinct?: CommunityPostScalarFieldEnum | CommunityPostScalarFieldEnum[]
  }

  /**
   * CommunityPost findMany
   */
  export type CommunityPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter, which CommunityPosts to fetch.
     */
    where?: CommunityPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityPosts to fetch.
     */
    orderBy?: CommunityPostOrderByWithRelationInput | CommunityPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommunityPosts.
     */
    cursor?: CommunityPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityPosts.
     */
    skip?: number
    distinct?: CommunityPostScalarFieldEnum | CommunityPostScalarFieldEnum[]
  }

  /**
   * CommunityPost create
   */
  export type CommunityPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * The data needed to create a CommunityPost.
     */
    data: XOR<CommunityPostCreateInput, CommunityPostUncheckedCreateInput>
  }

  /**
   * CommunityPost createMany
   */
  export type CommunityPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommunityPosts.
     */
    data: CommunityPostCreateManyInput | CommunityPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommunityPost update
   */
  export type CommunityPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * The data needed to update a CommunityPost.
     */
    data: XOR<CommunityPostUpdateInput, CommunityPostUncheckedUpdateInput>
    /**
     * Choose, which CommunityPost to update.
     */
    where: CommunityPostWhereUniqueInput
  }

  /**
   * CommunityPost updateMany
   */
  export type CommunityPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommunityPosts.
     */
    data: XOR<CommunityPostUpdateManyMutationInput, CommunityPostUncheckedUpdateManyInput>
    /**
     * Filter which CommunityPosts to update
     */
    where?: CommunityPostWhereInput
    /**
     * Limit how many CommunityPosts to update.
     */
    limit?: number
  }

  /**
   * CommunityPost upsert
   */
  export type CommunityPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * The filter to search for the CommunityPost to update in case it exists.
     */
    where: CommunityPostWhereUniqueInput
    /**
     * In case the CommunityPost found by the `where` argument doesn't exist, create a new CommunityPost with this data.
     */
    create: XOR<CommunityPostCreateInput, CommunityPostUncheckedCreateInput>
    /**
     * In case the CommunityPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityPostUpdateInput, CommunityPostUncheckedUpdateInput>
  }

  /**
   * CommunityPost delete
   */
  export type CommunityPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
    /**
     * Filter which CommunityPost to delete.
     */
    where: CommunityPostWhereUniqueInput
  }

  /**
   * CommunityPost deleteMany
   */
  export type CommunityPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityPosts to delete
     */
    where?: CommunityPostWhereInput
    /**
     * Limit how many CommunityPosts to delete.
     */
    limit?: number
  }

  /**
   * CommunityPost.answers
   */
  export type CommunityPost$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    where?: CommunityAnswerWhereInput
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    cursor?: CommunityAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityAnswerScalarFieldEnum | CommunityAnswerScalarFieldEnum[]
  }

  /**
   * CommunityPost without action
   */
  export type CommunityPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityPost
     */
    select?: CommunityPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityPost
     */
    omit?: CommunityPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityPostInclude<ExtArgs> | null
  }


  /**
   * Model CommunityAnswer
   */

  export type AggregateCommunityAnswer = {
    _count: CommunityAnswerCountAggregateOutputType | null
    _avg: CommunityAnswerAvgAggregateOutputType | null
    _sum: CommunityAnswerSumAggregateOutputType | null
    _min: CommunityAnswerMinAggregateOutputType | null
    _max: CommunityAnswerMaxAggregateOutputType | null
  }

  export type CommunityAnswerAvgAggregateOutputType = {
    id: number | null
    postId: number | null
    userId: number | null
    isHelpful: number | null
  }

  export type CommunityAnswerSumAggregateOutputType = {
    id: number | null
    postId: number | null
    userId: number | null
    isHelpful: number | null
  }

  export type CommunityAnswerMinAggregateOutputType = {
    id: number | null
    postId: number | null
    userId: number | null
    answer: string | null
    isAnonymous: boolean | null
    isHelpful: number | null
    createdAt: Date | null
  }

  export type CommunityAnswerMaxAggregateOutputType = {
    id: number | null
    postId: number | null
    userId: number | null
    answer: string | null
    isAnonymous: boolean | null
    isHelpful: number | null
    createdAt: Date | null
  }

  export type CommunityAnswerCountAggregateOutputType = {
    id: number
    postId: number
    userId: number
    answer: number
    isAnonymous: number
    isHelpful: number
    createdAt: number
    _all: number
  }


  export type CommunityAnswerAvgAggregateInputType = {
    id?: true
    postId?: true
    userId?: true
    isHelpful?: true
  }

  export type CommunityAnswerSumAggregateInputType = {
    id?: true
    postId?: true
    userId?: true
    isHelpful?: true
  }

  export type CommunityAnswerMinAggregateInputType = {
    id?: true
    postId?: true
    userId?: true
    answer?: true
    isAnonymous?: true
    isHelpful?: true
    createdAt?: true
  }

  export type CommunityAnswerMaxAggregateInputType = {
    id?: true
    postId?: true
    userId?: true
    answer?: true
    isAnonymous?: true
    isHelpful?: true
    createdAt?: true
  }

  export type CommunityAnswerCountAggregateInputType = {
    id?: true
    postId?: true
    userId?: true
    answer?: true
    isAnonymous?: true
    isHelpful?: true
    createdAt?: true
    _all?: true
  }

  export type CommunityAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityAnswer to aggregate.
     */
    where?: CommunityAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityAnswers to fetch.
     */
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommunityAnswers
    **/
    _count?: true | CommunityAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommunityAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommunityAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityAnswerMaxAggregateInputType
  }

  export type GetCommunityAnswerAggregateType<T extends CommunityAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunityAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunityAnswer[P]>
      : GetScalarType<T[P], AggregateCommunityAnswer[P]>
  }




  export type CommunityAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityAnswerWhereInput
    orderBy?: CommunityAnswerOrderByWithAggregationInput | CommunityAnswerOrderByWithAggregationInput[]
    by: CommunityAnswerScalarFieldEnum[] | CommunityAnswerScalarFieldEnum
    having?: CommunityAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityAnswerCountAggregateInputType | true
    _avg?: CommunityAnswerAvgAggregateInputType
    _sum?: CommunityAnswerSumAggregateInputType
    _min?: CommunityAnswerMinAggregateInputType
    _max?: CommunityAnswerMaxAggregateInputType
  }

  export type CommunityAnswerGroupByOutputType = {
    id: number
    postId: number
    userId: number
    answer: string
    isAnonymous: boolean
    isHelpful: number
    createdAt: Date
    _count: CommunityAnswerCountAggregateOutputType | null
    _avg: CommunityAnswerAvgAggregateOutputType | null
    _sum: CommunityAnswerSumAggregateOutputType | null
    _min: CommunityAnswerMinAggregateOutputType | null
    _max: CommunityAnswerMaxAggregateOutputType | null
  }

  type GetCommunityAnswerGroupByPayload<T extends CommunityAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityAnswerGroupByOutputType[P]>
        }
      >
    >


  export type CommunityAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    userId?: boolean
    answer?: boolean
    isAnonymous?: boolean
    isHelpful?: boolean
    createdAt?: boolean
    post?: boolean | CommunityPostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityAnswer"]>



  export type CommunityAnswerSelectScalar = {
    id?: boolean
    postId?: boolean
    userId?: boolean
    answer?: boolean
    isAnonymous?: boolean
    isHelpful?: boolean
    createdAt?: boolean
  }

  export type CommunityAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "userId" | "answer" | "isAnonymous" | "isHelpful" | "createdAt", ExtArgs["result"]["communityAnswer"]>
  export type CommunityAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | CommunityPostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommunityAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommunityAnswer"
    objects: {
      post: Prisma.$CommunityPostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      postId: number
      userId: number
      answer: string
      isAnonymous: boolean
      isHelpful: number
      createdAt: Date
    }, ExtArgs["result"]["communityAnswer"]>
    composites: {}
  }

  type CommunityAnswerGetPayload<S extends boolean | null | undefined | CommunityAnswerDefaultArgs> = $Result.GetResult<Prisma.$CommunityAnswerPayload, S>

  type CommunityAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommunityAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommunityAnswerCountAggregateInputType | true
    }

  export interface CommunityAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommunityAnswer'], meta: { name: 'CommunityAnswer' } }
    /**
     * Find zero or one CommunityAnswer that matches the filter.
     * @param {CommunityAnswerFindUniqueArgs} args - Arguments to find a CommunityAnswer
     * @example
     * // Get one CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityAnswerFindUniqueArgs>(args: SelectSubset<T, CommunityAnswerFindUniqueArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommunityAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommunityAnswerFindUniqueOrThrowArgs} args - Arguments to find a CommunityAnswer
     * @example
     * // Get one CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerFindFirstArgs} args - Arguments to find a CommunityAnswer
     * @example
     * // Get one CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityAnswerFindFirstArgs>(args?: SelectSubset<T, CommunityAnswerFindFirstArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerFindFirstOrThrowArgs} args - Arguments to find a CommunityAnswer
     * @example
     * // Get one CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommunityAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommunityAnswers
     * const communityAnswers = await prisma.communityAnswer.findMany()
     * 
     * // Get first 10 CommunityAnswers
     * const communityAnswers = await prisma.communityAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityAnswerWithIdOnly = await prisma.communityAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityAnswerFindManyArgs>(args?: SelectSubset<T, CommunityAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommunityAnswer.
     * @param {CommunityAnswerCreateArgs} args - Arguments to create a CommunityAnswer.
     * @example
     * // Create one CommunityAnswer
     * const CommunityAnswer = await prisma.communityAnswer.create({
     *   data: {
     *     // ... data to create a CommunityAnswer
     *   }
     * })
     * 
     */
    create<T extends CommunityAnswerCreateArgs>(args: SelectSubset<T, CommunityAnswerCreateArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommunityAnswers.
     * @param {CommunityAnswerCreateManyArgs} args - Arguments to create many CommunityAnswers.
     * @example
     * // Create many CommunityAnswers
     * const communityAnswer = await prisma.communityAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityAnswerCreateManyArgs>(args?: SelectSubset<T, CommunityAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CommunityAnswer.
     * @param {CommunityAnswerDeleteArgs} args - Arguments to delete one CommunityAnswer.
     * @example
     * // Delete one CommunityAnswer
     * const CommunityAnswer = await prisma.communityAnswer.delete({
     *   where: {
     *     // ... filter to delete one CommunityAnswer
     *   }
     * })
     * 
     */
    delete<T extends CommunityAnswerDeleteArgs>(args: SelectSubset<T, CommunityAnswerDeleteArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommunityAnswer.
     * @param {CommunityAnswerUpdateArgs} args - Arguments to update one CommunityAnswer.
     * @example
     * // Update one CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityAnswerUpdateArgs>(args: SelectSubset<T, CommunityAnswerUpdateArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommunityAnswers.
     * @param {CommunityAnswerDeleteManyArgs} args - Arguments to filter CommunityAnswers to delete.
     * @example
     * // Delete a few CommunityAnswers
     * const { count } = await prisma.communityAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityAnswerDeleteManyArgs>(args?: SelectSubset<T, CommunityAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommunityAnswers
     * const communityAnswer = await prisma.communityAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityAnswerUpdateManyArgs>(args: SelectSubset<T, CommunityAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommunityAnswer.
     * @param {CommunityAnswerUpsertArgs} args - Arguments to update or create a CommunityAnswer.
     * @example
     * // Update or create a CommunityAnswer
     * const communityAnswer = await prisma.communityAnswer.upsert({
     *   create: {
     *     // ... data to create a CommunityAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommunityAnswer we want to update
     *   }
     * })
     */
    upsert<T extends CommunityAnswerUpsertArgs>(args: SelectSubset<T, CommunityAnswerUpsertArgs<ExtArgs>>): Prisma__CommunityAnswerClient<$Result.GetResult<Prisma.$CommunityAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommunityAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerCountArgs} args - Arguments to filter CommunityAnswers to count.
     * @example
     * // Count the number of CommunityAnswers
     * const count = await prisma.communityAnswer.count({
     *   where: {
     *     // ... the filter for the CommunityAnswers we want to count
     *   }
     * })
    **/
    count<T extends CommunityAnswerCountArgs>(
      args?: Subset<T, CommunityAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommunityAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityAnswerAggregateArgs>(args: Subset<T, CommunityAnswerAggregateArgs>): Prisma.PrismaPromise<GetCommunityAnswerAggregateType<T>>

    /**
     * Group by CommunityAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityAnswerGroupByArgs['orderBy'] }
        : { orderBy?: CommunityAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommunityAnswer model
   */
  readonly fields: CommunityAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommunityAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends CommunityPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommunityPostDefaultArgs<ExtArgs>>): Prisma__CommunityPostClient<$Result.GetResult<Prisma.$CommunityPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommunityAnswer model
   */
  interface CommunityAnswerFieldRefs {
    readonly id: FieldRef<"CommunityAnswer", 'Int'>
    readonly postId: FieldRef<"CommunityAnswer", 'Int'>
    readonly userId: FieldRef<"CommunityAnswer", 'Int'>
    readonly answer: FieldRef<"CommunityAnswer", 'String'>
    readonly isAnonymous: FieldRef<"CommunityAnswer", 'Boolean'>
    readonly isHelpful: FieldRef<"CommunityAnswer", 'Int'>
    readonly createdAt: FieldRef<"CommunityAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommunityAnswer findUnique
   */
  export type CommunityAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter, which CommunityAnswer to fetch.
     */
    where: CommunityAnswerWhereUniqueInput
  }

  /**
   * CommunityAnswer findUniqueOrThrow
   */
  export type CommunityAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter, which CommunityAnswer to fetch.
     */
    where: CommunityAnswerWhereUniqueInput
  }

  /**
   * CommunityAnswer findFirst
   */
  export type CommunityAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter, which CommunityAnswer to fetch.
     */
    where?: CommunityAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityAnswers to fetch.
     */
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityAnswers.
     */
    cursor?: CommunityAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityAnswers.
     */
    distinct?: CommunityAnswerScalarFieldEnum | CommunityAnswerScalarFieldEnum[]
  }

  /**
   * CommunityAnswer findFirstOrThrow
   */
  export type CommunityAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter, which CommunityAnswer to fetch.
     */
    where?: CommunityAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityAnswers to fetch.
     */
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityAnswers.
     */
    cursor?: CommunityAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityAnswers.
     */
    distinct?: CommunityAnswerScalarFieldEnum | CommunityAnswerScalarFieldEnum[]
  }

  /**
   * CommunityAnswer findMany
   */
  export type CommunityAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter, which CommunityAnswers to fetch.
     */
    where?: CommunityAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityAnswers to fetch.
     */
    orderBy?: CommunityAnswerOrderByWithRelationInput | CommunityAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommunityAnswers.
     */
    cursor?: CommunityAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityAnswers.
     */
    skip?: number
    distinct?: CommunityAnswerScalarFieldEnum | CommunityAnswerScalarFieldEnum[]
  }

  /**
   * CommunityAnswer create
   */
  export type CommunityAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a CommunityAnswer.
     */
    data: XOR<CommunityAnswerCreateInput, CommunityAnswerUncheckedCreateInput>
  }

  /**
   * CommunityAnswer createMany
   */
  export type CommunityAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommunityAnswers.
     */
    data: CommunityAnswerCreateManyInput | CommunityAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommunityAnswer update
   */
  export type CommunityAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a CommunityAnswer.
     */
    data: XOR<CommunityAnswerUpdateInput, CommunityAnswerUncheckedUpdateInput>
    /**
     * Choose, which CommunityAnswer to update.
     */
    where: CommunityAnswerWhereUniqueInput
  }

  /**
   * CommunityAnswer updateMany
   */
  export type CommunityAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommunityAnswers.
     */
    data: XOR<CommunityAnswerUpdateManyMutationInput, CommunityAnswerUncheckedUpdateManyInput>
    /**
     * Filter which CommunityAnswers to update
     */
    where?: CommunityAnswerWhereInput
    /**
     * Limit how many CommunityAnswers to update.
     */
    limit?: number
  }

  /**
   * CommunityAnswer upsert
   */
  export type CommunityAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the CommunityAnswer to update in case it exists.
     */
    where: CommunityAnswerWhereUniqueInput
    /**
     * In case the CommunityAnswer found by the `where` argument doesn't exist, create a new CommunityAnswer with this data.
     */
    create: XOR<CommunityAnswerCreateInput, CommunityAnswerUncheckedCreateInput>
    /**
     * In case the CommunityAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityAnswerUpdateInput, CommunityAnswerUncheckedUpdateInput>
  }

  /**
   * CommunityAnswer delete
   */
  export type CommunityAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
    /**
     * Filter which CommunityAnswer to delete.
     */
    where: CommunityAnswerWhereUniqueInput
  }

  /**
   * CommunityAnswer deleteMany
   */
  export type CommunityAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityAnswers to delete
     */
    where?: CommunityAnswerWhereInput
    /**
     * Limit how many CommunityAnswers to delete.
     */
    limit?: number
  }

  /**
   * CommunityAnswer without action
   */
  export type CommunityAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityAnswer
     */
    select?: CommunityAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityAnswer
     */
    omit?: CommunityAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityAnswerInclude<ExtArgs> | null
  }


  /**
   * Model FriendRequest
   */

  export type AggregateFriendRequest = {
    _count: FriendRequestCountAggregateOutputType | null
    _avg: FriendRequestAvgAggregateOutputType | null
    _sum: FriendRequestSumAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  export type FriendRequestAvgAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type FriendRequestSumAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type FriendRequestMinAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendRequestMaxAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendRequestCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendRequestAvgAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type FriendRequestSumAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type FriendRequestMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendRequestMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendRequestCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequest to aggregate.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendRequests
    **/
    _count?: true | FriendRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendRequestMaxAggregateInputType
  }

  export type GetFriendRequestAggregateType<T extends FriendRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendRequest[P]>
      : GetScalarType<T[P], AggregateFriendRequest[P]>
  }




  export type FriendRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithAggregationInput | FriendRequestOrderByWithAggregationInput[]
    by: FriendRequestScalarFieldEnum[] | FriendRequestScalarFieldEnum
    having?: FriendRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendRequestCountAggregateInputType | true
    _avg?: FriendRequestAvgAggregateInputType
    _sum?: FriendRequestSumAggregateInputType
    _min?: FriendRequestMinAggregateInputType
    _max?: FriendRequestMaxAggregateInputType
  }

  export type FriendRequestGroupByOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: string
    createdAt: Date
    updatedAt: Date
    _count: FriendRequestCountAggregateOutputType | null
    _avg: FriendRequestAvgAggregateOutputType | null
    _sum: FriendRequestSumAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  type GetFriendRequestGroupByPayload<T extends FriendRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
            : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
        }
      >
    >


  export type FriendRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>



  export type FriendRequestSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["friendRequest"]>
  export type FriendRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendRequest"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      senderId: number
      receiverId: number
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friendRequest"]>
    composites: {}
  }

  type FriendRequestGetPayload<S extends boolean | null | undefined | FriendRequestDefaultArgs> = $Result.GetResult<Prisma.$FriendRequestPayload, S>

  type FriendRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendRequestCountAggregateInputType | true
    }

  export interface FriendRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendRequest'], meta: { name: 'FriendRequest' } }
    /**
     * Find zero or one FriendRequest that matches the filter.
     * @param {FriendRequestFindUniqueArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendRequestFindUniqueArgs>(args: SelectSubset<T, FriendRequestFindUniqueArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendRequestFindUniqueOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendRequestFindFirstArgs>(args?: SelectSubset<T, FriendRequestFindFirstArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany()
     * 
     * // Get first 10 FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendRequestFindManyArgs>(args?: SelectSubset<T, FriendRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendRequest.
     * @param {FriendRequestCreateArgs} args - Arguments to create a FriendRequest.
     * @example
     * // Create one FriendRequest
     * const FriendRequest = await prisma.friendRequest.create({
     *   data: {
     *     // ... data to create a FriendRequest
     *   }
     * })
     * 
     */
    create<T extends FriendRequestCreateArgs>(args: SelectSubset<T, FriendRequestCreateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendRequests.
     * @param {FriendRequestCreateManyArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendRequestCreateManyArgs>(args?: SelectSubset<T, FriendRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FriendRequest.
     * @param {FriendRequestDeleteArgs} args - Arguments to delete one FriendRequest.
     * @example
     * // Delete one FriendRequest
     * const FriendRequest = await prisma.friendRequest.delete({
     *   where: {
     *     // ... filter to delete one FriendRequest
     *   }
     * })
     * 
     */
    delete<T extends FriendRequestDeleteArgs>(args: SelectSubset<T, FriendRequestDeleteArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendRequest.
     * @param {FriendRequestUpdateArgs} args - Arguments to update one FriendRequest.
     * @example
     * // Update one FriendRequest
     * const friendRequest = await prisma.friendRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendRequestUpdateArgs>(args: SelectSubset<T, FriendRequestUpdateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendRequests.
     * @param {FriendRequestDeleteManyArgs} args - Arguments to filter FriendRequests to delete.
     * @example
     * // Delete a few FriendRequests
     * const { count } = await prisma.friendRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendRequestDeleteManyArgs>(args?: SelectSubset<T, FriendRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendRequestUpdateManyArgs>(args: SelectSubset<T, FriendRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FriendRequest.
     * @param {FriendRequestUpsertArgs} args - Arguments to update or create a FriendRequest.
     * @example
     * // Update or create a FriendRequest
     * const friendRequest = await prisma.friendRequest.upsert({
     *   create: {
     *     // ... data to create a FriendRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendRequest we want to update
     *   }
     * })
     */
    upsert<T extends FriendRequestUpsertArgs>(args: SelectSubset<T, FriendRequestUpsertArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestCountArgs} args - Arguments to filter FriendRequests to count.
     * @example
     * // Count the number of FriendRequests
     * const count = await prisma.friendRequest.count({
     *   where: {
     *     // ... the filter for the FriendRequests we want to count
     *   }
     * })
    **/
    count<T extends FriendRequestCountArgs>(
      args?: Subset<T, FriendRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendRequestAggregateArgs>(args: Subset<T, FriendRequestAggregateArgs>): Prisma.PrismaPromise<GetFriendRequestAggregateType<T>>

    /**
     * Group by FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendRequestGroupByArgs['orderBy'] }
        : { orderBy?: FriendRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendRequest model
   */
  readonly fields: FriendRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendRequest model
   */
  interface FriendRequestFieldRefs {
    readonly id: FieldRef<"FriendRequest", 'Int'>
    readonly senderId: FieldRef<"FriendRequest", 'Int'>
    readonly receiverId: FieldRef<"FriendRequest", 'Int'>
    readonly status: FieldRef<"FriendRequest", 'String'>
    readonly createdAt: FieldRef<"FriendRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"FriendRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendRequest findUnique
   */
  export type FriendRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findUniqueOrThrow
   */
  export type FriendRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findFirst
   */
  export type FriendRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findFirstOrThrow
   */
  export type FriendRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findMany
   */
  export type FriendRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequests to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest create
   */
  export type FriendRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendRequest.
     */
    data: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
  }

  /**
   * FriendRequest createMany
   */
  export type FriendRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendRequest update
   */
  export type FriendRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendRequest.
     */
    data: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
    /**
     * Choose, which FriendRequest to update.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest updateMany
   */
  export type FriendRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to update.
     */
    limit?: number
  }

  /**
   * FriendRequest upsert
   */
  export type FriendRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendRequest to update in case it exists.
     */
    where: FriendRequestWhereUniqueInput
    /**
     * In case the FriendRequest found by the `where` argument doesn't exist, create a new FriendRequest with this data.
     */
    create: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
    /**
     * In case the FriendRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
  }

  /**
   * FriendRequest delete
   */
  export type FriendRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter which FriendRequest to delete.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest deleteMany
   */
  export type FriendRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequests to delete
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to delete.
     */
    limit?: number
  }

  /**
   * FriendRequest without action
   */
  export type FriendRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
  }


  /**
   * Model ProductDiscovery
   */

  export type AggregateProductDiscovery = {
    _count: ProductDiscoveryCountAggregateOutputType | null
    _avg: ProductDiscoveryAvgAggregateOutputType | null
    _sum: ProductDiscoverySumAggregateOutputType | null
    _min: ProductDiscoveryMinAggregateOutputType | null
    _max: ProductDiscoveryMaxAggregateOutputType | null
  }

  export type ProductDiscoveryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    rating: number | null
    version: number | null
  }

  export type ProductDiscoverySumAggregateOutputType = {
    id: number | null
    userId: number | null
    rating: number | null
    version: number | null
  }

  export type ProductDiscoveryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    productName: string | null
    brand: string | null
    productKey: string | null
    imageHash: string | null
    review: string | null
    rating: number | null
    discoveredOn: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDiscoveryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    productName: string | null
    brand: string | null
    productKey: string | null
    imageHash: string | null
    review: string | null
    rating: number | null
    discoveredOn: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDiscoveryCountAggregateOutputType = {
    id: number
    userId: number
    productName: number
    brand: number
    productKey: number
    imageHash: number
    review: number
    rating: number
    discoveredOn: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductDiscoveryAvgAggregateInputType = {
    id?: true
    userId?: true
    rating?: true
    version?: true
  }

  export type ProductDiscoverySumAggregateInputType = {
    id?: true
    userId?: true
    rating?: true
    version?: true
  }

  export type ProductDiscoveryMinAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    brand?: true
    productKey?: true
    imageHash?: true
    review?: true
    rating?: true
    discoveredOn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDiscoveryMaxAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    brand?: true
    productKey?: true
    imageHash?: true
    review?: true
    rating?: true
    discoveredOn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDiscoveryCountAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    brand?: true
    productKey?: true
    imageHash?: true
    review?: true
    rating?: true
    discoveredOn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductDiscoveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscovery to aggregate.
     */
    where?: ProductDiscoveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveries to fetch.
     */
    orderBy?: ProductDiscoveryOrderByWithRelationInput | ProductDiscoveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductDiscoveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductDiscoveries
    **/
    _count?: true | ProductDiscoveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductDiscoveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductDiscoverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductDiscoveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductDiscoveryMaxAggregateInputType
  }

  export type GetProductDiscoveryAggregateType<T extends ProductDiscoveryAggregateArgs> = {
        [P in keyof T & keyof AggregateProductDiscovery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductDiscovery[P]>
      : GetScalarType<T[P], AggregateProductDiscovery[P]>
  }




  export type ProductDiscoveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscoveryWhereInput
    orderBy?: ProductDiscoveryOrderByWithAggregationInput | ProductDiscoveryOrderByWithAggregationInput[]
    by: ProductDiscoveryScalarFieldEnum[] | ProductDiscoveryScalarFieldEnum
    having?: ProductDiscoveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductDiscoveryCountAggregateInputType | true
    _avg?: ProductDiscoveryAvgAggregateInputType
    _sum?: ProductDiscoverySumAggregateInputType
    _min?: ProductDiscoveryMinAggregateInputType
    _max?: ProductDiscoveryMaxAggregateInputType
  }

  export type ProductDiscoveryGroupByOutputType = {
    id: number
    userId: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating: number | null
    discoveredOn: string
    version: number
    createdAt: Date
    updatedAt: Date
    _count: ProductDiscoveryCountAggregateOutputType | null
    _avg: ProductDiscoveryAvgAggregateOutputType | null
    _sum: ProductDiscoverySumAggregateOutputType | null
    _min: ProductDiscoveryMinAggregateOutputType | null
    _max: ProductDiscoveryMaxAggregateOutputType | null
  }

  type GetProductDiscoveryGroupByPayload<T extends ProductDiscoveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductDiscoveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductDiscoveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductDiscoveryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductDiscoveryGroupByOutputType[P]>
        }
      >
    >


  export type ProductDiscoverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productName?: boolean
    brand?: boolean
    productKey?: boolean
    imageHash?: boolean
    review?: boolean
    rating?: boolean
    discoveredOn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    image?: boolean | ProductDiscovery$imageArgs<ExtArgs>
  }, ExtArgs["result"]["productDiscovery"]>



  export type ProductDiscoverySelectScalar = {
    id?: boolean
    userId?: boolean
    productName?: boolean
    brand?: boolean
    productKey?: boolean
    imageHash?: boolean
    review?: boolean
    rating?: boolean
    discoveredOn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductDiscoveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productName" | "brand" | "productKey" | "imageHash" | "review" | "rating" | "discoveredOn" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["productDiscovery"]>
  export type ProductDiscoveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    image?: boolean | ProductDiscovery$imageArgs<ExtArgs>
  }

  export type $ProductDiscoveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductDiscovery"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      image: Prisma.$ProductDiscoveryImagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      productName: string
      brand: string
      productKey: string
      imageHash: string
      review: string
      rating: number | null
      discoveredOn: string
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productDiscovery"]>
    composites: {}
  }

  type ProductDiscoveryGetPayload<S extends boolean | null | undefined | ProductDiscoveryDefaultArgs> = $Result.GetResult<Prisma.$ProductDiscoveryPayload, S>

  type ProductDiscoveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductDiscoveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductDiscoveryCountAggregateInputType | true
    }

  export interface ProductDiscoveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductDiscovery'], meta: { name: 'ProductDiscovery' } }
    /**
     * Find zero or one ProductDiscovery that matches the filter.
     * @param {ProductDiscoveryFindUniqueArgs} args - Arguments to find a ProductDiscovery
     * @example
     * // Get one ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductDiscoveryFindUniqueArgs>(args: SelectSubset<T, ProductDiscoveryFindUniqueArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductDiscovery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductDiscoveryFindUniqueOrThrowArgs} args - Arguments to find a ProductDiscovery
     * @example
     * // Get one ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductDiscoveryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductDiscoveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscovery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryFindFirstArgs} args - Arguments to find a ProductDiscovery
     * @example
     * // Get one ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductDiscoveryFindFirstArgs>(args?: SelectSubset<T, ProductDiscoveryFindFirstArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscovery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryFindFirstOrThrowArgs} args - Arguments to find a ProductDiscovery
     * @example
     * // Get one ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductDiscoveryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductDiscoveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductDiscoveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductDiscoveries
     * const productDiscoveries = await prisma.productDiscovery.findMany()
     * 
     * // Get first 10 ProductDiscoveries
     * const productDiscoveries = await prisma.productDiscovery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productDiscoveryWithIdOnly = await prisma.productDiscovery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductDiscoveryFindManyArgs>(args?: SelectSubset<T, ProductDiscoveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductDiscovery.
     * @param {ProductDiscoveryCreateArgs} args - Arguments to create a ProductDiscovery.
     * @example
     * // Create one ProductDiscovery
     * const ProductDiscovery = await prisma.productDiscovery.create({
     *   data: {
     *     // ... data to create a ProductDiscovery
     *   }
     * })
     * 
     */
    create<T extends ProductDiscoveryCreateArgs>(args: SelectSubset<T, ProductDiscoveryCreateArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductDiscoveries.
     * @param {ProductDiscoveryCreateManyArgs} args - Arguments to create many ProductDiscoveries.
     * @example
     * // Create many ProductDiscoveries
     * const productDiscovery = await prisma.productDiscovery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductDiscoveryCreateManyArgs>(args?: SelectSubset<T, ProductDiscoveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductDiscovery.
     * @param {ProductDiscoveryDeleteArgs} args - Arguments to delete one ProductDiscovery.
     * @example
     * // Delete one ProductDiscovery
     * const ProductDiscovery = await prisma.productDiscovery.delete({
     *   where: {
     *     // ... filter to delete one ProductDiscovery
     *   }
     * })
     * 
     */
    delete<T extends ProductDiscoveryDeleteArgs>(args: SelectSubset<T, ProductDiscoveryDeleteArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductDiscovery.
     * @param {ProductDiscoveryUpdateArgs} args - Arguments to update one ProductDiscovery.
     * @example
     * // Update one ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductDiscoveryUpdateArgs>(args: SelectSubset<T, ProductDiscoveryUpdateArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductDiscoveries.
     * @param {ProductDiscoveryDeleteManyArgs} args - Arguments to filter ProductDiscoveries to delete.
     * @example
     * // Delete a few ProductDiscoveries
     * const { count } = await prisma.productDiscovery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDiscoveryDeleteManyArgs>(args?: SelectSubset<T, ProductDiscoveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductDiscoveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductDiscoveries
     * const productDiscovery = await prisma.productDiscovery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductDiscoveryUpdateManyArgs>(args: SelectSubset<T, ProductDiscoveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductDiscovery.
     * @param {ProductDiscoveryUpsertArgs} args - Arguments to update or create a ProductDiscovery.
     * @example
     * // Update or create a ProductDiscovery
     * const productDiscovery = await prisma.productDiscovery.upsert({
     *   create: {
     *     // ... data to create a ProductDiscovery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductDiscovery we want to update
     *   }
     * })
     */
    upsert<T extends ProductDiscoveryUpsertArgs>(args: SelectSubset<T, ProductDiscoveryUpsertArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductDiscoveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryCountArgs} args - Arguments to filter ProductDiscoveries to count.
     * @example
     * // Count the number of ProductDiscoveries
     * const count = await prisma.productDiscovery.count({
     *   where: {
     *     // ... the filter for the ProductDiscoveries we want to count
     *   }
     * })
    **/
    count<T extends ProductDiscoveryCountArgs>(
      args?: Subset<T, ProductDiscoveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductDiscoveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductDiscovery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductDiscoveryAggregateArgs>(args: Subset<T, ProductDiscoveryAggregateArgs>): Prisma.PrismaPromise<GetProductDiscoveryAggregateType<T>>

    /**
     * Group by ProductDiscovery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductDiscoveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductDiscoveryGroupByArgs['orderBy'] }
        : { orderBy?: ProductDiscoveryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductDiscoveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductDiscoveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductDiscovery model
   */
  readonly fields: ProductDiscoveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductDiscovery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductDiscoveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    image<T extends ProductDiscovery$imageArgs<ExtArgs> = {}>(args?: Subset<T, ProductDiscovery$imageArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductDiscovery model
   */
  interface ProductDiscoveryFieldRefs {
    readonly id: FieldRef<"ProductDiscovery", 'Int'>
    readonly userId: FieldRef<"ProductDiscovery", 'Int'>
    readonly productName: FieldRef<"ProductDiscovery", 'String'>
    readonly brand: FieldRef<"ProductDiscovery", 'String'>
    readonly productKey: FieldRef<"ProductDiscovery", 'String'>
    readonly imageHash: FieldRef<"ProductDiscovery", 'String'>
    readonly review: FieldRef<"ProductDiscovery", 'String'>
    readonly rating: FieldRef<"ProductDiscovery", 'Int'>
    readonly discoveredOn: FieldRef<"ProductDiscovery", 'String'>
    readonly version: FieldRef<"ProductDiscovery", 'Int'>
    readonly createdAt: FieldRef<"ProductDiscovery", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductDiscovery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductDiscovery findUnique
   */
  export type ProductDiscoveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscovery to fetch.
     */
    where: ProductDiscoveryWhereUniqueInput
  }

  /**
   * ProductDiscovery findUniqueOrThrow
   */
  export type ProductDiscoveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscovery to fetch.
     */
    where: ProductDiscoveryWhereUniqueInput
  }

  /**
   * ProductDiscovery findFirst
   */
  export type ProductDiscoveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscovery to fetch.
     */
    where?: ProductDiscoveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveries to fetch.
     */
    orderBy?: ProductDiscoveryOrderByWithRelationInput | ProductDiscoveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscoveries.
     */
    cursor?: ProductDiscoveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscoveries.
     */
    distinct?: ProductDiscoveryScalarFieldEnum | ProductDiscoveryScalarFieldEnum[]
  }

  /**
   * ProductDiscovery findFirstOrThrow
   */
  export type ProductDiscoveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscovery to fetch.
     */
    where?: ProductDiscoveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveries to fetch.
     */
    orderBy?: ProductDiscoveryOrderByWithRelationInput | ProductDiscoveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscoveries.
     */
    cursor?: ProductDiscoveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscoveries.
     */
    distinct?: ProductDiscoveryScalarFieldEnum | ProductDiscoveryScalarFieldEnum[]
  }

  /**
   * ProductDiscovery findMany
   */
  export type ProductDiscoveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveries to fetch.
     */
    where?: ProductDiscoveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveries to fetch.
     */
    orderBy?: ProductDiscoveryOrderByWithRelationInput | ProductDiscoveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductDiscoveries.
     */
    cursor?: ProductDiscoveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveries.
     */
    skip?: number
    distinct?: ProductDiscoveryScalarFieldEnum | ProductDiscoveryScalarFieldEnum[]
  }

  /**
   * ProductDiscovery create
   */
  export type ProductDiscoveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductDiscovery.
     */
    data: XOR<ProductDiscoveryCreateInput, ProductDiscoveryUncheckedCreateInput>
  }

  /**
   * ProductDiscovery createMany
   */
  export type ProductDiscoveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductDiscoveries.
     */
    data: ProductDiscoveryCreateManyInput | ProductDiscoveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductDiscovery update
   */
  export type ProductDiscoveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductDiscovery.
     */
    data: XOR<ProductDiscoveryUpdateInput, ProductDiscoveryUncheckedUpdateInput>
    /**
     * Choose, which ProductDiscovery to update.
     */
    where: ProductDiscoveryWhereUniqueInput
  }

  /**
   * ProductDiscovery updateMany
   */
  export type ProductDiscoveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductDiscoveries.
     */
    data: XOR<ProductDiscoveryUpdateManyMutationInput, ProductDiscoveryUncheckedUpdateManyInput>
    /**
     * Filter which ProductDiscoveries to update
     */
    where?: ProductDiscoveryWhereInput
    /**
     * Limit how many ProductDiscoveries to update.
     */
    limit?: number
  }

  /**
   * ProductDiscovery upsert
   */
  export type ProductDiscoveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductDiscovery to update in case it exists.
     */
    where: ProductDiscoveryWhereUniqueInput
    /**
     * In case the ProductDiscovery found by the `where` argument doesn't exist, create a new ProductDiscovery with this data.
     */
    create: XOR<ProductDiscoveryCreateInput, ProductDiscoveryUncheckedCreateInput>
    /**
     * In case the ProductDiscovery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductDiscoveryUpdateInput, ProductDiscoveryUncheckedUpdateInput>
  }

  /**
   * ProductDiscovery delete
   */
  export type ProductDiscoveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
    /**
     * Filter which ProductDiscovery to delete.
     */
    where: ProductDiscoveryWhereUniqueInput
  }

  /**
   * ProductDiscovery deleteMany
   */
  export type ProductDiscoveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscoveries to delete
     */
    where?: ProductDiscoveryWhereInput
    /**
     * Limit how many ProductDiscoveries to delete.
     */
    limit?: number
  }

  /**
   * ProductDiscovery.image
   */
  export type ProductDiscovery$imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    where?: ProductDiscoveryImageWhereInput
  }

  /**
   * ProductDiscovery without action
   */
  export type ProductDiscoveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscovery
     */
    select?: ProductDiscoverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscovery
     */
    omit?: ProductDiscoveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryInclude<ExtArgs> | null
  }


  /**
   * Model ProductDiscoveryImage
   */

  export type AggregateProductDiscoveryImage = {
    _count: ProductDiscoveryImageCountAggregateOutputType | null
    _avg: ProductDiscoveryImageAvgAggregateOutputType | null
    _sum: ProductDiscoveryImageSumAggregateOutputType | null
    _min: ProductDiscoveryImageMinAggregateOutputType | null
    _max: ProductDiscoveryImageMaxAggregateOutputType | null
  }

  export type ProductDiscoveryImageAvgAggregateOutputType = {
    discoveryId: number | null
  }

  export type ProductDiscoveryImageSumAggregateOutputType = {
    discoveryId: number | null
  }

  export type ProductDiscoveryImageMinAggregateOutputType = {
    discoveryId: number | null
    bytes: Bytes | null
    thumbnail: Bytes | null
  }

  export type ProductDiscoveryImageMaxAggregateOutputType = {
    discoveryId: number | null
    bytes: Bytes | null
    thumbnail: Bytes | null
  }

  export type ProductDiscoveryImageCountAggregateOutputType = {
    discoveryId: number
    bytes: number
    thumbnail: number
    _all: number
  }


  export type ProductDiscoveryImageAvgAggregateInputType = {
    discoveryId?: true
  }

  export type ProductDiscoveryImageSumAggregateInputType = {
    discoveryId?: true
  }

  export type ProductDiscoveryImageMinAggregateInputType = {
    discoveryId?: true
    bytes?: true
    thumbnail?: true
  }

  export type ProductDiscoveryImageMaxAggregateInputType = {
    discoveryId?: true
    bytes?: true
    thumbnail?: true
  }

  export type ProductDiscoveryImageCountAggregateInputType = {
    discoveryId?: true
    bytes?: true
    thumbnail?: true
    _all?: true
  }

  export type ProductDiscoveryImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscoveryImage to aggregate.
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveryImages to fetch.
     */
    orderBy?: ProductDiscoveryImageOrderByWithRelationInput | ProductDiscoveryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductDiscoveryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductDiscoveryImages
    **/
    _count?: true | ProductDiscoveryImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductDiscoveryImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductDiscoveryImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductDiscoveryImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductDiscoveryImageMaxAggregateInputType
  }

  export type GetProductDiscoveryImageAggregateType<T extends ProductDiscoveryImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductDiscoveryImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductDiscoveryImage[P]>
      : GetScalarType<T[P], AggregateProductDiscoveryImage[P]>
  }




  export type ProductDiscoveryImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscoveryImageWhereInput
    orderBy?: ProductDiscoveryImageOrderByWithAggregationInput | ProductDiscoveryImageOrderByWithAggregationInput[]
    by: ProductDiscoveryImageScalarFieldEnum[] | ProductDiscoveryImageScalarFieldEnum
    having?: ProductDiscoveryImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductDiscoveryImageCountAggregateInputType | true
    _avg?: ProductDiscoveryImageAvgAggregateInputType
    _sum?: ProductDiscoveryImageSumAggregateInputType
    _min?: ProductDiscoveryImageMinAggregateInputType
    _max?: ProductDiscoveryImageMaxAggregateInputType
  }

  export type ProductDiscoveryImageGroupByOutputType = {
    discoveryId: number
    bytes: Bytes
    thumbnail: Bytes
    _count: ProductDiscoveryImageCountAggregateOutputType | null
    _avg: ProductDiscoveryImageAvgAggregateOutputType | null
    _sum: ProductDiscoveryImageSumAggregateOutputType | null
    _min: ProductDiscoveryImageMinAggregateOutputType | null
    _max: ProductDiscoveryImageMaxAggregateOutputType | null
  }

  type GetProductDiscoveryImageGroupByPayload<T extends ProductDiscoveryImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductDiscoveryImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductDiscoveryImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductDiscoveryImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductDiscoveryImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductDiscoveryImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    discoveryId?: boolean
    bytes?: boolean
    thumbnail?: boolean
    discovery?: boolean | ProductDiscoveryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productDiscoveryImage"]>



  export type ProductDiscoveryImageSelectScalar = {
    discoveryId?: boolean
    bytes?: boolean
    thumbnail?: boolean
  }

  export type ProductDiscoveryImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"discoveryId" | "bytes" | "thumbnail", ExtArgs["result"]["productDiscoveryImage"]>
  export type ProductDiscoveryImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discovery?: boolean | ProductDiscoveryDefaultArgs<ExtArgs>
  }

  export type $ProductDiscoveryImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductDiscoveryImage"
    objects: {
      discovery: Prisma.$ProductDiscoveryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      discoveryId: number
      bytes: Prisma.Bytes
      thumbnail: Prisma.Bytes
    }, ExtArgs["result"]["productDiscoveryImage"]>
    composites: {}
  }

  type ProductDiscoveryImageGetPayload<S extends boolean | null | undefined | ProductDiscoveryImageDefaultArgs> = $Result.GetResult<Prisma.$ProductDiscoveryImagePayload, S>

  type ProductDiscoveryImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductDiscoveryImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductDiscoveryImageCountAggregateInputType | true
    }

  export interface ProductDiscoveryImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductDiscoveryImage'], meta: { name: 'ProductDiscoveryImage' } }
    /**
     * Find zero or one ProductDiscoveryImage that matches the filter.
     * @param {ProductDiscoveryImageFindUniqueArgs} args - Arguments to find a ProductDiscoveryImage
     * @example
     * // Get one ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductDiscoveryImageFindUniqueArgs>(args: SelectSubset<T, ProductDiscoveryImageFindUniqueArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductDiscoveryImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductDiscoveryImageFindUniqueOrThrowArgs} args - Arguments to find a ProductDiscoveryImage
     * @example
     * // Get one ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductDiscoveryImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductDiscoveryImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscoveryImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageFindFirstArgs} args - Arguments to find a ProductDiscoveryImage
     * @example
     * // Get one ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductDiscoveryImageFindFirstArgs>(args?: SelectSubset<T, ProductDiscoveryImageFindFirstArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscoveryImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageFindFirstOrThrowArgs} args - Arguments to find a ProductDiscoveryImage
     * @example
     * // Get one ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductDiscoveryImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductDiscoveryImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductDiscoveryImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductDiscoveryImages
     * const productDiscoveryImages = await prisma.productDiscoveryImage.findMany()
     * 
     * // Get first 10 ProductDiscoveryImages
     * const productDiscoveryImages = await prisma.productDiscoveryImage.findMany({ take: 10 })
     * 
     * // Only select the `discoveryId`
     * const productDiscoveryImageWithDiscoveryIdOnly = await prisma.productDiscoveryImage.findMany({ select: { discoveryId: true } })
     * 
     */
    findMany<T extends ProductDiscoveryImageFindManyArgs>(args?: SelectSubset<T, ProductDiscoveryImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductDiscoveryImage.
     * @param {ProductDiscoveryImageCreateArgs} args - Arguments to create a ProductDiscoveryImage.
     * @example
     * // Create one ProductDiscoveryImage
     * const ProductDiscoveryImage = await prisma.productDiscoveryImage.create({
     *   data: {
     *     // ... data to create a ProductDiscoveryImage
     *   }
     * })
     * 
     */
    create<T extends ProductDiscoveryImageCreateArgs>(args: SelectSubset<T, ProductDiscoveryImageCreateArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductDiscoveryImages.
     * @param {ProductDiscoveryImageCreateManyArgs} args - Arguments to create many ProductDiscoveryImages.
     * @example
     * // Create many ProductDiscoveryImages
     * const productDiscoveryImage = await prisma.productDiscoveryImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductDiscoveryImageCreateManyArgs>(args?: SelectSubset<T, ProductDiscoveryImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductDiscoveryImage.
     * @param {ProductDiscoveryImageDeleteArgs} args - Arguments to delete one ProductDiscoveryImage.
     * @example
     * // Delete one ProductDiscoveryImage
     * const ProductDiscoveryImage = await prisma.productDiscoveryImage.delete({
     *   where: {
     *     // ... filter to delete one ProductDiscoveryImage
     *   }
     * })
     * 
     */
    delete<T extends ProductDiscoveryImageDeleteArgs>(args: SelectSubset<T, ProductDiscoveryImageDeleteArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductDiscoveryImage.
     * @param {ProductDiscoveryImageUpdateArgs} args - Arguments to update one ProductDiscoveryImage.
     * @example
     * // Update one ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductDiscoveryImageUpdateArgs>(args: SelectSubset<T, ProductDiscoveryImageUpdateArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductDiscoveryImages.
     * @param {ProductDiscoveryImageDeleteManyArgs} args - Arguments to filter ProductDiscoveryImages to delete.
     * @example
     * // Delete a few ProductDiscoveryImages
     * const { count } = await prisma.productDiscoveryImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDiscoveryImageDeleteManyArgs>(args?: SelectSubset<T, ProductDiscoveryImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductDiscoveryImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductDiscoveryImages
     * const productDiscoveryImage = await prisma.productDiscoveryImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductDiscoveryImageUpdateManyArgs>(args: SelectSubset<T, ProductDiscoveryImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductDiscoveryImage.
     * @param {ProductDiscoveryImageUpsertArgs} args - Arguments to update or create a ProductDiscoveryImage.
     * @example
     * // Update or create a ProductDiscoveryImage
     * const productDiscoveryImage = await prisma.productDiscoveryImage.upsert({
     *   create: {
     *     // ... data to create a ProductDiscoveryImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductDiscoveryImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductDiscoveryImageUpsertArgs>(args: SelectSubset<T, ProductDiscoveryImageUpsertArgs<ExtArgs>>): Prisma__ProductDiscoveryImageClient<$Result.GetResult<Prisma.$ProductDiscoveryImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductDiscoveryImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageCountArgs} args - Arguments to filter ProductDiscoveryImages to count.
     * @example
     * // Count the number of ProductDiscoveryImages
     * const count = await prisma.productDiscoveryImage.count({
     *   where: {
     *     // ... the filter for the ProductDiscoveryImages we want to count
     *   }
     * })
    **/
    count<T extends ProductDiscoveryImageCountArgs>(
      args?: Subset<T, ProductDiscoveryImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductDiscoveryImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductDiscoveryImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductDiscoveryImageAggregateArgs>(args: Subset<T, ProductDiscoveryImageAggregateArgs>): Prisma.PrismaPromise<GetProductDiscoveryImageAggregateType<T>>

    /**
     * Group by ProductDiscoveryImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscoveryImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductDiscoveryImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductDiscoveryImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductDiscoveryImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductDiscoveryImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductDiscoveryImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductDiscoveryImage model
   */
  readonly fields: ProductDiscoveryImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductDiscoveryImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductDiscoveryImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discovery<T extends ProductDiscoveryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDiscoveryDefaultArgs<ExtArgs>>): Prisma__ProductDiscoveryClient<$Result.GetResult<Prisma.$ProductDiscoveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductDiscoveryImage model
   */
  interface ProductDiscoveryImageFieldRefs {
    readonly discoveryId: FieldRef<"ProductDiscoveryImage", 'Int'>
    readonly bytes: FieldRef<"ProductDiscoveryImage", 'Bytes'>
    readonly thumbnail: FieldRef<"ProductDiscoveryImage", 'Bytes'>
  }
    

  // Custom InputTypes
  /**
   * ProductDiscoveryImage findUnique
   */
  export type ProductDiscoveryImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveryImage to fetch.
     */
    where: ProductDiscoveryImageWhereUniqueInput
  }

  /**
   * ProductDiscoveryImage findUniqueOrThrow
   */
  export type ProductDiscoveryImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveryImage to fetch.
     */
    where: ProductDiscoveryImageWhereUniqueInput
  }

  /**
   * ProductDiscoveryImage findFirst
   */
  export type ProductDiscoveryImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveryImage to fetch.
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveryImages to fetch.
     */
    orderBy?: ProductDiscoveryImageOrderByWithRelationInput | ProductDiscoveryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscoveryImages.
     */
    cursor?: ProductDiscoveryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscoveryImages.
     */
    distinct?: ProductDiscoveryImageScalarFieldEnum | ProductDiscoveryImageScalarFieldEnum[]
  }

  /**
   * ProductDiscoveryImage findFirstOrThrow
   */
  export type ProductDiscoveryImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveryImage to fetch.
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveryImages to fetch.
     */
    orderBy?: ProductDiscoveryImageOrderByWithRelationInput | ProductDiscoveryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscoveryImages.
     */
    cursor?: ProductDiscoveryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveryImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscoveryImages.
     */
    distinct?: ProductDiscoveryImageScalarFieldEnum | ProductDiscoveryImageScalarFieldEnum[]
  }

  /**
   * ProductDiscoveryImage findMany
   */
  export type ProductDiscoveryImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscoveryImages to fetch.
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscoveryImages to fetch.
     */
    orderBy?: ProductDiscoveryImageOrderByWithRelationInput | ProductDiscoveryImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductDiscoveryImages.
     */
    cursor?: ProductDiscoveryImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscoveryImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscoveryImages.
     */
    skip?: number
    distinct?: ProductDiscoveryImageScalarFieldEnum | ProductDiscoveryImageScalarFieldEnum[]
  }

  /**
   * ProductDiscoveryImage create
   */
  export type ProductDiscoveryImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductDiscoveryImage.
     */
    data: XOR<ProductDiscoveryImageCreateInput, ProductDiscoveryImageUncheckedCreateInput>
  }

  /**
   * ProductDiscoveryImage createMany
   */
  export type ProductDiscoveryImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductDiscoveryImages.
     */
    data: ProductDiscoveryImageCreateManyInput | ProductDiscoveryImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductDiscoveryImage update
   */
  export type ProductDiscoveryImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductDiscoveryImage.
     */
    data: XOR<ProductDiscoveryImageUpdateInput, ProductDiscoveryImageUncheckedUpdateInput>
    /**
     * Choose, which ProductDiscoveryImage to update.
     */
    where: ProductDiscoveryImageWhereUniqueInput
  }

  /**
   * ProductDiscoveryImage updateMany
   */
  export type ProductDiscoveryImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductDiscoveryImages.
     */
    data: XOR<ProductDiscoveryImageUpdateManyMutationInput, ProductDiscoveryImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductDiscoveryImages to update
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * Limit how many ProductDiscoveryImages to update.
     */
    limit?: number
  }

  /**
   * ProductDiscoveryImage upsert
   */
  export type ProductDiscoveryImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductDiscoveryImage to update in case it exists.
     */
    where: ProductDiscoveryImageWhereUniqueInput
    /**
     * In case the ProductDiscoveryImage found by the `where` argument doesn't exist, create a new ProductDiscoveryImage with this data.
     */
    create: XOR<ProductDiscoveryImageCreateInput, ProductDiscoveryImageUncheckedCreateInput>
    /**
     * In case the ProductDiscoveryImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductDiscoveryImageUpdateInput, ProductDiscoveryImageUncheckedUpdateInput>
  }

  /**
   * ProductDiscoveryImage delete
   */
  export type ProductDiscoveryImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
    /**
     * Filter which ProductDiscoveryImage to delete.
     */
    where: ProductDiscoveryImageWhereUniqueInput
  }

  /**
   * ProductDiscoveryImage deleteMany
   */
  export type ProductDiscoveryImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscoveryImages to delete
     */
    where?: ProductDiscoveryImageWhereInput
    /**
     * Limit how many ProductDiscoveryImages to delete.
     */
    limit?: number
  }

  /**
   * ProductDiscoveryImage without action
   */
  export type ProductDiscoveryImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscoveryImage
     */
    select?: ProductDiscoveryImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscoveryImage
     */
    omit?: ProductDiscoveryImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscoveryImageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    googleId: 'googleId',
    phoneNumber: 'phoneNumber',
    isNewUser: 'isNewUser',
    username: 'username',
    usernameChangedAt: 'usernameChangedAt',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    age: 'age',
    gender: 'gender',
    skinType: 'skinType',
    skinGoals: 'skinGoals',
    budget: 'budget',
    currentProducts: 'currentProducts',
    currentRoutine: 'currentRoutine',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const RecommendationScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    routine: 'routine',
    products: 'products',
    productAnalysis: 'productAnalysis',
    isEffective: 'isEffective',
    hasCurrentProducts: 'hasCurrentProducts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecommendationScalarFieldEnum = (typeof RecommendationScalarFieldEnum)[keyof typeof RecommendationScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    brand: 'brand',
    category: 'category',
    price: 'price',
    originalPrice: 'originalPrice',
    discount: 'discount',
    skinTypes: 'skinTypes',
    skinGoals: 'skinGoals',
    description: 'description',
    howToUse: 'howToUse',
    availableAt: 'availableAt',
    rating: 'rating',
    reviewCount: 'reviewCount',
    ingredients: 'ingredients',
    imageUrl: 'imageUrl',
    productUrl: 'productUrl',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const SkincareLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    timeOfDay: 'timeOfDay',
    productsUsed: 'productsUsed',
    notes: 'notes',
    photo: 'photo',
    createdAt: 'createdAt'
  };

  export type SkincareLogScalarFieldEnum = (typeof SkincareLogScalarFieldEnum)[keyof typeof SkincareLogScalarFieldEnum]


  export const Ingredient_ConflictScalarFieldEnum: {
    id: 'id',
    ingredientA: 'ingredientA',
    ingredientB: 'ingredientB',
    severityLevel: 'severityLevel',
    warningMessage: 'warningMessage',
    createdAt: 'createdAt'
  };

  export type Ingredient_ConflictScalarFieldEnum = (typeof Ingredient_ConflictScalarFieldEnum)[keyof typeof Ingredient_ConflictScalarFieldEnum]


  export const CommunityPostScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    question: 'question',
    details: 'details',
    category: 'category',
    skinType: 'skinType',
    isAnonymous: 'isAnonymous',
    likes: 'likes',
    createdAt: 'createdAt'
  };

  export type CommunityPostScalarFieldEnum = (typeof CommunityPostScalarFieldEnum)[keyof typeof CommunityPostScalarFieldEnum]


  export const CommunityAnswerScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    userId: 'userId',
    answer: 'answer',
    isAnonymous: 'isAnonymous',
    isHelpful: 'isHelpful',
    createdAt: 'createdAt'
  };

  export type CommunityAnswerScalarFieldEnum = (typeof CommunityAnswerScalarFieldEnum)[keyof typeof CommunityAnswerScalarFieldEnum]


  export const FriendRequestScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendRequestScalarFieldEnum = (typeof FriendRequestScalarFieldEnum)[keyof typeof FriendRequestScalarFieldEnum]


  export const ProductDiscoveryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productName: 'productName',
    brand: 'brand',
    productKey: 'productKey',
    imageHash: 'imageHash',
    review: 'review',
    rating: 'rating',
    discoveredOn: 'discoveredOn',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductDiscoveryScalarFieldEnum = (typeof ProductDiscoveryScalarFieldEnum)[keyof typeof ProductDiscoveryScalarFieldEnum]


  export const ProductDiscoveryImageScalarFieldEnum: {
    discoveryId: 'discoveryId',
    bytes: 'bytes',
    thumbnail: 'thumbnail'
  };

  export type ProductDiscoveryImageScalarFieldEnum = (typeof ProductDiscoveryImageScalarFieldEnum)[keyof typeof ProductDiscoveryImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password',
    googleId: 'googleId',
    phoneNumber: 'phoneNumber',
    username: 'username'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ProfileOrderByRelevanceFieldEnum: {
    gender: 'gender',
    skinType: 'skinType',
    skinGoals: 'skinGoals',
    currentProducts: 'currentProducts',
    currentRoutine: 'currentRoutine'
  };

  export type ProfileOrderByRelevanceFieldEnum = (typeof ProfileOrderByRelevanceFieldEnum)[keyof typeof ProfileOrderByRelevanceFieldEnum]


  export const RecommendationOrderByRelevanceFieldEnum: {
    routine: 'routine',
    products: 'products',
    productAnalysis: 'productAnalysis'
  };

  export type RecommendationOrderByRelevanceFieldEnum = (typeof RecommendationOrderByRelevanceFieldEnum)[keyof typeof RecommendationOrderByRelevanceFieldEnum]


  export const ProductOrderByRelevanceFieldEnum: {
    name: 'name',
    brand: 'brand',
    category: 'category',
    discount: 'discount',
    skinTypes: 'skinTypes',
    skinGoals: 'skinGoals',
    description: 'description',
    howToUse: 'howToUse',
    availableAt: 'availableAt',
    ingredients: 'ingredients',
    imageUrl: 'imageUrl',
    productUrl: 'productUrl'
  };

  export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum]


  export const SkincareLogOrderByRelevanceFieldEnum: {
    timeOfDay: 'timeOfDay',
    productsUsed: 'productsUsed',
    notes: 'notes',
    photo: 'photo'
  };

  export type SkincareLogOrderByRelevanceFieldEnum = (typeof SkincareLogOrderByRelevanceFieldEnum)[keyof typeof SkincareLogOrderByRelevanceFieldEnum]


  export const Ingredient_ConflictOrderByRelevanceFieldEnum: {
    ingredientA: 'ingredientA',
    ingredientB: 'ingredientB',
    severityLevel: 'severityLevel',
    warningMessage: 'warningMessage'
  };

  export type Ingredient_ConflictOrderByRelevanceFieldEnum = (typeof Ingredient_ConflictOrderByRelevanceFieldEnum)[keyof typeof Ingredient_ConflictOrderByRelevanceFieldEnum]


  export const CommunityPostOrderByRelevanceFieldEnum: {
    question: 'question',
    details: 'details',
    category: 'category',
    skinType: 'skinType'
  };

  export type CommunityPostOrderByRelevanceFieldEnum = (typeof CommunityPostOrderByRelevanceFieldEnum)[keyof typeof CommunityPostOrderByRelevanceFieldEnum]


  export const CommunityAnswerOrderByRelevanceFieldEnum: {
    answer: 'answer'
  };

  export type CommunityAnswerOrderByRelevanceFieldEnum = (typeof CommunityAnswerOrderByRelevanceFieldEnum)[keyof typeof CommunityAnswerOrderByRelevanceFieldEnum]


  export const FriendRequestOrderByRelevanceFieldEnum: {
    status: 'status'
  };

  export type FriendRequestOrderByRelevanceFieldEnum = (typeof FriendRequestOrderByRelevanceFieldEnum)[keyof typeof FriendRequestOrderByRelevanceFieldEnum]


  export const ProductDiscoveryOrderByRelevanceFieldEnum: {
    productName: 'productName',
    brand: 'brand',
    productKey: 'productKey',
    imageHash: 'imageHash',
    review: 'review',
    discoveredOn: 'discoveredOn'
  };

  export type ProductDiscoveryOrderByRelevanceFieldEnum = (typeof ProductDiscoveryOrderByRelevanceFieldEnum)[keyof typeof ProductDiscoveryOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    isNewUser?: BoolFilter<"User"> | boolean
    username?: StringNullableFilter<"User"> | string | null
    usernameChangedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    discoveries?: ProductDiscoveryListRelationFilter
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    skincareLogs?: SkincareLogListRelationFilter
    communityPosts?: CommunityPostListRelationFilter
    communityAnswers?: CommunityAnswerListRelationFilter
    sentRequests?: FriendRequestListRelationFilter
    receivedRequests?: FriendRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    isNewUser?: SortOrder
    username?: SortOrderInput | SortOrder
    usernameChangedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    discoveries?: ProductDiscoveryOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
    skincareLogs?: SkincareLogOrderByRelationAggregateInput
    communityPosts?: CommunityPostOrderByRelationAggregateInput
    communityAnswers?: CommunityAnswerOrderByRelationAggregateInput
    sentRequests?: FriendRequestOrderByRelationAggregateInput
    receivedRequests?: FriendRequestOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    googleId?: string
    phoneNumber?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    isNewUser?: BoolFilter<"User"> | boolean
    usernameChangedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    discoveries?: ProductDiscoveryListRelationFilter
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    skincareLogs?: SkincareLogListRelationFilter
    communityPosts?: CommunityPostListRelationFilter
    communityAnswers?: CommunityAnswerListRelationFilter
    sentRequests?: FriendRequestListRelationFilter
    receivedRequests?: FriendRequestListRelationFilter
  }, "id" | "email" | "googleId" | "phoneNumber" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    isNewUser?: SortOrder
    username?: SortOrderInput | SortOrder
    usernameChangedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    isNewUser?: BoolWithAggregatesFilter<"User"> | boolean
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    usernameChangedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: IntFilter<"Profile"> | number
    userId?: IntFilter<"Profile"> | number
    age?: IntFilter<"Profile"> | number
    gender?: StringFilter<"Profile"> | string
    skinType?: StringFilter<"Profile"> | string
    skinGoals?: StringFilter<"Profile"> | string
    budget?: FloatFilter<"Profile"> | number
    currentProducts?: StringNullableFilter<"Profile"> | string | null
    currentRoutine?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recommendation?: XOR<RecommendationNullableScalarRelationFilter, RecommendationWhereInput> | null
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    skinType?: SortOrder
    skinGoals?: SortOrder
    budget?: SortOrder
    currentProducts?: SortOrderInput | SortOrder
    currentRoutine?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    recommendation?: RecommendationOrderByWithRelationInput
    _relevance?: ProfileOrderByRelevanceInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    age?: IntFilter<"Profile"> | number
    gender?: StringFilter<"Profile"> | string
    skinType?: StringFilter<"Profile"> | string
    skinGoals?: StringFilter<"Profile"> | string
    budget?: FloatFilter<"Profile"> | number
    currentProducts?: StringNullableFilter<"Profile"> | string | null
    currentRoutine?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recommendation?: XOR<RecommendationNullableScalarRelationFilter, RecommendationWhereInput> | null
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    skinType?: SortOrder
    skinGoals?: SortOrder
    budget?: SortOrder
    currentProducts?: SortOrderInput | SortOrder
    currentRoutine?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Profile"> | number
    userId?: IntWithAggregatesFilter<"Profile"> | number
    age?: IntWithAggregatesFilter<"Profile"> | number
    gender?: StringWithAggregatesFilter<"Profile"> | string
    skinType?: StringWithAggregatesFilter<"Profile"> | string
    skinGoals?: StringWithAggregatesFilter<"Profile"> | string
    budget?: FloatWithAggregatesFilter<"Profile"> | number
    currentProducts?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    currentRoutine?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type RecommendationWhereInput = {
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    id?: IntFilter<"Recommendation"> | number
    profileId?: IntFilter<"Recommendation"> | number
    routine?: StringFilter<"Recommendation"> | string
    products?: StringFilter<"Recommendation"> | string
    productAnalysis?: StringNullableFilter<"Recommendation"> | string | null
    isEffective?: BoolFilter<"Recommendation"> | boolean
    hasCurrentProducts?: BoolFilter<"Recommendation"> | boolean
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    updatedAt?: DateTimeFilter<"Recommendation"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type RecommendationOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    routine?: SortOrder
    products?: SortOrder
    productAnalysis?: SortOrderInput | SortOrder
    isEffective?: SortOrder
    hasCurrentProducts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: RecommendationOrderByRelevanceInput
  }

  export type RecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    profileId?: number
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    routine?: StringFilter<"Recommendation"> | string
    products?: StringFilter<"Recommendation"> | string
    productAnalysis?: StringNullableFilter<"Recommendation"> | string | null
    isEffective?: BoolFilter<"Recommendation"> | boolean
    hasCurrentProducts?: BoolFilter<"Recommendation"> | boolean
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    updatedAt?: DateTimeFilter<"Recommendation"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "profileId">

  export type RecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    routine?: SortOrder
    products?: SortOrder
    productAnalysis?: SortOrderInput | SortOrder
    isEffective?: SortOrder
    hasCurrentProducts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecommendationCountOrderByAggregateInput
    _avg?: RecommendationAvgOrderByAggregateInput
    _max?: RecommendationMaxOrderByAggregateInput
    _min?: RecommendationMinOrderByAggregateInput
    _sum?: RecommendationSumOrderByAggregateInput
  }

  export type RecommendationScalarWhereWithAggregatesInput = {
    AND?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    OR?: RecommendationScalarWhereWithAggregatesInput[]
    NOT?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Recommendation"> | number
    profileId?: IntWithAggregatesFilter<"Recommendation"> | number
    routine?: StringWithAggregatesFilter<"Recommendation"> | string
    products?: StringWithAggregatesFilter<"Recommendation"> | string
    productAnalysis?: StringNullableWithAggregatesFilter<"Recommendation"> | string | null
    isEffective?: BoolWithAggregatesFilter<"Recommendation"> | boolean
    hasCurrentProducts?: BoolWithAggregatesFilter<"Recommendation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Recommendation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recommendation"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    brand?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    originalPrice?: FloatFilter<"Product"> | number
    discount?: StringNullableFilter<"Product"> | string | null
    skinTypes?: StringFilter<"Product"> | string
    skinGoals?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    howToUse?: StringFilter<"Product"> | string
    availableAt?: StringFilter<"Product"> | string
    rating?: FloatFilter<"Product"> | number
    reviewCount?: IntFilter<"Product"> | number
    ingredients?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    productUrl?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    discount?: SortOrderInput | SortOrder
    skinTypes?: SortOrder
    skinGoals?: SortOrder
    description?: SortOrder
    howToUse?: SortOrder
    availableAt?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    ingredients?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    productUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: ProductOrderByRelevanceInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    brand?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    originalPrice?: FloatFilter<"Product"> | number
    discount?: StringNullableFilter<"Product"> | string | null
    skinTypes?: StringFilter<"Product"> | string
    skinGoals?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    howToUse?: StringFilter<"Product"> | string
    availableAt?: StringFilter<"Product"> | string
    rating?: FloatFilter<"Product"> | number
    reviewCount?: IntFilter<"Product"> | number
    ingredients?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    productUrl?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    discount?: SortOrderInput | SortOrder
    skinTypes?: SortOrder
    skinGoals?: SortOrder
    description?: SortOrder
    howToUse?: SortOrder
    availableAt?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    ingredients?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    productUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    brand?: StringWithAggregatesFilter<"Product"> | string
    category?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    originalPrice?: FloatWithAggregatesFilter<"Product"> | number
    discount?: StringNullableWithAggregatesFilter<"Product"> | string | null
    skinTypes?: StringWithAggregatesFilter<"Product"> | string
    skinGoals?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    howToUse?: StringWithAggregatesFilter<"Product"> | string
    availableAt?: StringWithAggregatesFilter<"Product"> | string
    rating?: FloatWithAggregatesFilter<"Product"> | number
    reviewCount?: IntWithAggregatesFilter<"Product"> | number
    ingredients?: StringNullableWithAggregatesFilter<"Product"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    productUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type SkincareLogWhereInput = {
    AND?: SkincareLogWhereInput | SkincareLogWhereInput[]
    OR?: SkincareLogWhereInput[]
    NOT?: SkincareLogWhereInput | SkincareLogWhereInput[]
    id?: IntFilter<"SkincareLog"> | number
    userId?: IntFilter<"SkincareLog"> | number
    timeOfDay?: StringFilter<"SkincareLog"> | string
    productsUsed?: StringFilter<"SkincareLog"> | string
    notes?: StringNullableFilter<"SkincareLog"> | string | null
    photo?: StringNullableFilter<"SkincareLog"> | string | null
    createdAt?: DateTimeFilter<"SkincareLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SkincareLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeOfDay?: SortOrder
    productsUsed?: SortOrder
    notes?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: SkincareLogOrderByRelevanceInput
  }

  export type SkincareLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SkincareLogWhereInput | SkincareLogWhereInput[]
    OR?: SkincareLogWhereInput[]
    NOT?: SkincareLogWhereInput | SkincareLogWhereInput[]
    userId?: IntFilter<"SkincareLog"> | number
    timeOfDay?: StringFilter<"SkincareLog"> | string
    productsUsed?: StringFilter<"SkincareLog"> | string
    notes?: StringNullableFilter<"SkincareLog"> | string | null
    photo?: StringNullableFilter<"SkincareLog"> | string | null
    createdAt?: DateTimeFilter<"SkincareLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SkincareLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeOfDay?: SortOrder
    productsUsed?: SortOrder
    notes?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SkincareLogCountOrderByAggregateInput
    _avg?: SkincareLogAvgOrderByAggregateInput
    _max?: SkincareLogMaxOrderByAggregateInput
    _min?: SkincareLogMinOrderByAggregateInput
    _sum?: SkincareLogSumOrderByAggregateInput
  }

  export type SkincareLogScalarWhereWithAggregatesInput = {
    AND?: SkincareLogScalarWhereWithAggregatesInput | SkincareLogScalarWhereWithAggregatesInput[]
    OR?: SkincareLogScalarWhereWithAggregatesInput[]
    NOT?: SkincareLogScalarWhereWithAggregatesInput | SkincareLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SkincareLog"> | number
    userId?: IntWithAggregatesFilter<"SkincareLog"> | number
    timeOfDay?: StringWithAggregatesFilter<"SkincareLog"> | string
    productsUsed?: StringWithAggregatesFilter<"SkincareLog"> | string
    notes?: StringNullableWithAggregatesFilter<"SkincareLog"> | string | null
    photo?: StringNullableWithAggregatesFilter<"SkincareLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SkincareLog"> | Date | string
  }

  export type Ingredient_ConflictWhereInput = {
    AND?: Ingredient_ConflictWhereInput | Ingredient_ConflictWhereInput[]
    OR?: Ingredient_ConflictWhereInput[]
    NOT?: Ingredient_ConflictWhereInput | Ingredient_ConflictWhereInput[]
    id?: IntFilter<"Ingredient_Conflict"> | number
    ingredientA?: StringFilter<"Ingredient_Conflict"> | string
    ingredientB?: StringFilter<"Ingredient_Conflict"> | string
    severityLevel?: StringFilter<"Ingredient_Conflict"> | string
    warningMessage?: StringFilter<"Ingredient_Conflict"> | string
    createdAt?: DateTimeFilter<"Ingredient_Conflict"> | Date | string
  }

  export type Ingredient_ConflictOrderByWithRelationInput = {
    id?: SortOrder
    ingredientA?: SortOrder
    ingredientB?: SortOrder
    severityLevel?: SortOrder
    warningMessage?: SortOrder
    createdAt?: SortOrder
    _relevance?: Ingredient_ConflictOrderByRelevanceInput
  }

  export type Ingredient_ConflictWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ingredientA_ingredientB?: Ingredient_ConflictIngredientAIngredientBCompoundUniqueInput
    AND?: Ingredient_ConflictWhereInput | Ingredient_ConflictWhereInput[]
    OR?: Ingredient_ConflictWhereInput[]
    NOT?: Ingredient_ConflictWhereInput | Ingredient_ConflictWhereInput[]
    ingredientA?: StringFilter<"Ingredient_Conflict"> | string
    ingredientB?: StringFilter<"Ingredient_Conflict"> | string
    severityLevel?: StringFilter<"Ingredient_Conflict"> | string
    warningMessage?: StringFilter<"Ingredient_Conflict"> | string
    createdAt?: DateTimeFilter<"Ingredient_Conflict"> | Date | string
  }, "id" | "ingredientA_ingredientB">

  export type Ingredient_ConflictOrderByWithAggregationInput = {
    id?: SortOrder
    ingredientA?: SortOrder
    ingredientB?: SortOrder
    severityLevel?: SortOrder
    warningMessage?: SortOrder
    createdAt?: SortOrder
    _count?: Ingredient_ConflictCountOrderByAggregateInput
    _avg?: Ingredient_ConflictAvgOrderByAggregateInput
    _max?: Ingredient_ConflictMaxOrderByAggregateInput
    _min?: Ingredient_ConflictMinOrderByAggregateInput
    _sum?: Ingredient_ConflictSumOrderByAggregateInput
  }

  export type Ingredient_ConflictScalarWhereWithAggregatesInput = {
    AND?: Ingredient_ConflictScalarWhereWithAggregatesInput | Ingredient_ConflictScalarWhereWithAggregatesInput[]
    OR?: Ingredient_ConflictScalarWhereWithAggregatesInput[]
    NOT?: Ingredient_ConflictScalarWhereWithAggregatesInput | Ingredient_ConflictScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ingredient_Conflict"> | number
    ingredientA?: StringWithAggregatesFilter<"Ingredient_Conflict"> | string
    ingredientB?: StringWithAggregatesFilter<"Ingredient_Conflict"> | string
    severityLevel?: StringWithAggregatesFilter<"Ingredient_Conflict"> | string
    warningMessage?: StringWithAggregatesFilter<"Ingredient_Conflict"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Ingredient_Conflict"> | Date | string
  }

  export type CommunityPostWhereInput = {
    AND?: CommunityPostWhereInput | CommunityPostWhereInput[]
    OR?: CommunityPostWhereInput[]
    NOT?: CommunityPostWhereInput | CommunityPostWhereInput[]
    id?: IntFilter<"CommunityPost"> | number
    userId?: IntFilter<"CommunityPost"> | number
    question?: StringFilter<"CommunityPost"> | string
    details?: StringNullableFilter<"CommunityPost"> | string | null
    category?: StringFilter<"CommunityPost"> | string
    skinType?: StringNullableFilter<"CommunityPost"> | string | null
    isAnonymous?: BoolFilter<"CommunityPost"> | boolean
    likes?: IntFilter<"CommunityPost"> | number
    createdAt?: DateTimeFilter<"CommunityPost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    answers?: CommunityAnswerListRelationFilter
  }

  export type CommunityPostOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    details?: SortOrderInput | SortOrder
    category?: SortOrder
    skinType?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    likes?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    answers?: CommunityAnswerOrderByRelationAggregateInput
    _relevance?: CommunityPostOrderByRelevanceInput
  }

  export type CommunityPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommunityPostWhereInput | CommunityPostWhereInput[]
    OR?: CommunityPostWhereInput[]
    NOT?: CommunityPostWhereInput | CommunityPostWhereInput[]
    userId?: IntFilter<"CommunityPost"> | number
    question?: StringFilter<"CommunityPost"> | string
    details?: StringNullableFilter<"CommunityPost"> | string | null
    category?: StringFilter<"CommunityPost"> | string
    skinType?: StringNullableFilter<"CommunityPost"> | string | null
    isAnonymous?: BoolFilter<"CommunityPost"> | boolean
    likes?: IntFilter<"CommunityPost"> | number
    createdAt?: DateTimeFilter<"CommunityPost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    answers?: CommunityAnswerListRelationFilter
  }, "id">

  export type CommunityPostOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    details?: SortOrderInput | SortOrder
    category?: SortOrder
    skinType?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    likes?: SortOrder
    createdAt?: SortOrder
    _count?: CommunityPostCountOrderByAggregateInput
    _avg?: CommunityPostAvgOrderByAggregateInput
    _max?: CommunityPostMaxOrderByAggregateInput
    _min?: CommunityPostMinOrderByAggregateInput
    _sum?: CommunityPostSumOrderByAggregateInput
  }

  export type CommunityPostScalarWhereWithAggregatesInput = {
    AND?: CommunityPostScalarWhereWithAggregatesInput | CommunityPostScalarWhereWithAggregatesInput[]
    OR?: CommunityPostScalarWhereWithAggregatesInput[]
    NOT?: CommunityPostScalarWhereWithAggregatesInput | CommunityPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CommunityPost"> | number
    userId?: IntWithAggregatesFilter<"CommunityPost"> | number
    question?: StringWithAggregatesFilter<"CommunityPost"> | string
    details?: StringNullableWithAggregatesFilter<"CommunityPost"> | string | null
    category?: StringWithAggregatesFilter<"CommunityPost"> | string
    skinType?: StringNullableWithAggregatesFilter<"CommunityPost"> | string | null
    isAnonymous?: BoolWithAggregatesFilter<"CommunityPost"> | boolean
    likes?: IntWithAggregatesFilter<"CommunityPost"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CommunityPost"> | Date | string
  }

  export type CommunityAnswerWhereInput = {
    AND?: CommunityAnswerWhereInput | CommunityAnswerWhereInput[]
    OR?: CommunityAnswerWhereInput[]
    NOT?: CommunityAnswerWhereInput | CommunityAnswerWhereInput[]
    id?: IntFilter<"CommunityAnswer"> | number
    postId?: IntFilter<"CommunityAnswer"> | number
    userId?: IntFilter<"CommunityAnswer"> | number
    answer?: StringFilter<"CommunityAnswer"> | string
    isAnonymous?: BoolFilter<"CommunityAnswer"> | boolean
    isHelpful?: IntFilter<"CommunityAnswer"> | number
    createdAt?: DateTimeFilter<"CommunityAnswer"> | Date | string
    post?: XOR<CommunityPostScalarRelationFilter, CommunityPostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommunityAnswerOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    answer?: SortOrder
    isAnonymous?: SortOrder
    isHelpful?: SortOrder
    createdAt?: SortOrder
    post?: CommunityPostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: CommunityAnswerOrderByRelevanceInput
  }

  export type CommunityAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommunityAnswerWhereInput | CommunityAnswerWhereInput[]
    OR?: CommunityAnswerWhereInput[]
    NOT?: CommunityAnswerWhereInput | CommunityAnswerWhereInput[]
    postId?: IntFilter<"CommunityAnswer"> | number
    userId?: IntFilter<"CommunityAnswer"> | number
    answer?: StringFilter<"CommunityAnswer"> | string
    isAnonymous?: BoolFilter<"CommunityAnswer"> | boolean
    isHelpful?: IntFilter<"CommunityAnswer"> | number
    createdAt?: DateTimeFilter<"CommunityAnswer"> | Date | string
    post?: XOR<CommunityPostScalarRelationFilter, CommunityPostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommunityAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    answer?: SortOrder
    isAnonymous?: SortOrder
    isHelpful?: SortOrder
    createdAt?: SortOrder
    _count?: CommunityAnswerCountOrderByAggregateInput
    _avg?: CommunityAnswerAvgOrderByAggregateInput
    _max?: CommunityAnswerMaxOrderByAggregateInput
    _min?: CommunityAnswerMinOrderByAggregateInput
    _sum?: CommunityAnswerSumOrderByAggregateInput
  }

  export type CommunityAnswerScalarWhereWithAggregatesInput = {
    AND?: CommunityAnswerScalarWhereWithAggregatesInput | CommunityAnswerScalarWhereWithAggregatesInput[]
    OR?: CommunityAnswerScalarWhereWithAggregatesInput[]
    NOT?: CommunityAnswerScalarWhereWithAggregatesInput | CommunityAnswerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CommunityAnswer"> | number
    postId?: IntWithAggregatesFilter<"CommunityAnswer"> | number
    userId?: IntWithAggregatesFilter<"CommunityAnswer"> | number
    answer?: StringWithAggregatesFilter<"CommunityAnswer"> | string
    isAnonymous?: BoolWithAggregatesFilter<"CommunityAnswer"> | boolean
    isHelpful?: IntWithAggregatesFilter<"CommunityAnswer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CommunityAnswer"> | Date | string
  }

  export type FriendRequestWhereInput = {
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    id?: IntFilter<"FriendRequest"> | number
    senderId?: IntFilter<"FriendRequest"> | number
    receiverId?: IntFilter<"FriendRequest"> | number
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendRequestOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    _relevance?: FriendRequestOrderByRelevanceInput
  }

  export type FriendRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    senderId_receiverId?: FriendRequestSenderIdReceiverIdCompoundUniqueInput
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    senderId?: IntFilter<"FriendRequest"> | number
    receiverId?: IntFilter<"FriendRequest"> | number
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "senderId_receiverId">

  export type FriendRequestOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendRequestCountOrderByAggregateInput
    _avg?: FriendRequestAvgOrderByAggregateInput
    _max?: FriendRequestMaxOrderByAggregateInput
    _min?: FriendRequestMinOrderByAggregateInput
    _sum?: FriendRequestSumOrderByAggregateInput
  }

  export type FriendRequestScalarWhereWithAggregatesInput = {
    AND?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    OR?: FriendRequestScalarWhereWithAggregatesInput[]
    NOT?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FriendRequest"> | number
    senderId?: IntWithAggregatesFilter<"FriendRequest"> | number
    receiverId?: IntWithAggregatesFilter<"FriendRequest"> | number
    status?: StringWithAggregatesFilter<"FriendRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
  }

  export type ProductDiscoveryWhereInput = {
    AND?: ProductDiscoveryWhereInput | ProductDiscoveryWhereInput[]
    OR?: ProductDiscoveryWhereInput[]
    NOT?: ProductDiscoveryWhereInput | ProductDiscoveryWhereInput[]
    id?: IntFilter<"ProductDiscovery"> | number
    userId?: IntFilter<"ProductDiscovery"> | number
    productName?: StringFilter<"ProductDiscovery"> | string
    brand?: StringFilter<"ProductDiscovery"> | string
    productKey?: StringFilter<"ProductDiscovery"> | string
    imageHash?: StringFilter<"ProductDiscovery"> | string
    review?: StringFilter<"ProductDiscovery"> | string
    rating?: IntNullableFilter<"ProductDiscovery"> | number | null
    discoveredOn?: StringFilter<"ProductDiscovery"> | string
    version?: IntFilter<"ProductDiscovery"> | number
    createdAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    image?: XOR<ProductDiscoveryImageNullableScalarRelationFilter, ProductDiscoveryImageWhereInput> | null
  }

  export type ProductDiscoveryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    brand?: SortOrder
    productKey?: SortOrder
    imageHash?: SortOrder
    review?: SortOrder
    rating?: SortOrderInput | SortOrder
    discoveredOn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    image?: ProductDiscoveryImageOrderByWithRelationInput
    _relevance?: ProductDiscoveryOrderByRelevanceInput
  }

  export type ProductDiscoveryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_productKey?: ProductDiscoveryUserIdProductKeyCompoundUniqueInput
    userId_imageHash?: ProductDiscoveryUserIdImageHashCompoundUniqueInput
    AND?: ProductDiscoveryWhereInput | ProductDiscoveryWhereInput[]
    OR?: ProductDiscoveryWhereInput[]
    NOT?: ProductDiscoveryWhereInput | ProductDiscoveryWhereInput[]
    userId?: IntFilter<"ProductDiscovery"> | number
    productName?: StringFilter<"ProductDiscovery"> | string
    brand?: StringFilter<"ProductDiscovery"> | string
    productKey?: StringFilter<"ProductDiscovery"> | string
    imageHash?: StringFilter<"ProductDiscovery"> | string
    review?: StringFilter<"ProductDiscovery"> | string
    rating?: IntNullableFilter<"ProductDiscovery"> | number | null
    discoveredOn?: StringFilter<"ProductDiscovery"> | string
    version?: IntFilter<"ProductDiscovery"> | number
    createdAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    image?: XOR<ProductDiscoveryImageNullableScalarRelationFilter, ProductDiscoveryImageWhereInput> | null
  }, "id" | "userId_productKey" | "userId_imageHash">

  export type ProductDiscoveryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    brand?: SortOrder
    productKey?: SortOrder
    imageHash?: SortOrder
    review?: SortOrder
    rating?: SortOrderInput | SortOrder
    discoveredOn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductDiscoveryCountOrderByAggregateInput
    _avg?: ProductDiscoveryAvgOrderByAggregateInput
    _max?: ProductDiscoveryMaxOrderByAggregateInput
    _min?: ProductDiscoveryMinOrderByAggregateInput
    _sum?: ProductDiscoverySumOrderByAggregateInput
  }

  export type ProductDiscoveryScalarWhereWithAggregatesInput = {
    AND?: ProductDiscoveryScalarWhereWithAggregatesInput | ProductDiscoveryScalarWhereWithAggregatesInput[]
    OR?: ProductDiscoveryScalarWhereWithAggregatesInput[]
    NOT?: ProductDiscoveryScalarWhereWithAggregatesInput | ProductDiscoveryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductDiscovery"> | number
    userId?: IntWithAggregatesFilter<"ProductDiscovery"> | number
    productName?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    brand?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    productKey?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    imageHash?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    review?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    rating?: IntNullableWithAggregatesFilter<"ProductDiscovery"> | number | null
    discoveredOn?: StringWithAggregatesFilter<"ProductDiscovery"> | string
    version?: IntWithAggregatesFilter<"ProductDiscovery"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductDiscovery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductDiscovery"> | Date | string
  }

  export type ProductDiscoveryImageWhereInput = {
    AND?: ProductDiscoveryImageWhereInput | ProductDiscoveryImageWhereInput[]
    OR?: ProductDiscoveryImageWhereInput[]
    NOT?: ProductDiscoveryImageWhereInput | ProductDiscoveryImageWhereInput[]
    discoveryId?: IntFilter<"ProductDiscoveryImage"> | number
    bytes?: BytesFilter<"ProductDiscoveryImage"> | Bytes
    thumbnail?: BytesFilter<"ProductDiscoveryImage"> | Bytes
    discovery?: XOR<ProductDiscoveryScalarRelationFilter, ProductDiscoveryWhereInput>
  }

  export type ProductDiscoveryImageOrderByWithRelationInput = {
    discoveryId?: SortOrder
    bytes?: SortOrder
    thumbnail?: SortOrder
    discovery?: ProductDiscoveryOrderByWithRelationInput
  }

  export type ProductDiscoveryImageWhereUniqueInput = Prisma.AtLeast<{
    discoveryId?: number
    AND?: ProductDiscoveryImageWhereInput | ProductDiscoveryImageWhereInput[]
    OR?: ProductDiscoveryImageWhereInput[]
    NOT?: ProductDiscoveryImageWhereInput | ProductDiscoveryImageWhereInput[]
    bytes?: BytesFilter<"ProductDiscoveryImage"> | Bytes
    thumbnail?: BytesFilter<"ProductDiscoveryImage"> | Bytes
    discovery?: XOR<ProductDiscoveryScalarRelationFilter, ProductDiscoveryWhereInput>
  }, "discoveryId">

  export type ProductDiscoveryImageOrderByWithAggregationInput = {
    discoveryId?: SortOrder
    bytes?: SortOrder
    thumbnail?: SortOrder
    _count?: ProductDiscoveryImageCountOrderByAggregateInput
    _avg?: ProductDiscoveryImageAvgOrderByAggregateInput
    _max?: ProductDiscoveryImageMaxOrderByAggregateInput
    _min?: ProductDiscoveryImageMinOrderByAggregateInput
    _sum?: ProductDiscoveryImageSumOrderByAggregateInput
  }

  export type ProductDiscoveryImageScalarWhereWithAggregatesInput = {
    AND?: ProductDiscoveryImageScalarWhereWithAggregatesInput | ProductDiscoveryImageScalarWhereWithAggregatesInput[]
    OR?: ProductDiscoveryImageScalarWhereWithAggregatesInput[]
    NOT?: ProductDiscoveryImageScalarWhereWithAggregatesInput | ProductDiscoveryImageScalarWhereWithAggregatesInput[]
    discoveryId?: IntWithAggregatesFilter<"ProductDiscoveryImage"> | number
    bytes?: BytesWithAggregatesFilter<"ProductDiscoveryImage"> | Bytes
    thumbnail?: BytesWithAggregatesFilter<"ProductDiscoveryImage"> | Bytes
  }

  export type UserCreateInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    recommendation?: RecommendationCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    userId: number
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recommendation?: RecommendationUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    recommendation?: RecommendationUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendation?: RecommendationUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: number
    userId: number
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationCreateInput = {
    routine: string
    products: string
    productAnalysis?: string | null
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutRecommendationInput
  }

  export type RecommendationUncheckedCreateInput = {
    id?: number
    profileId: number
    routine: string
    products: string
    productAnalysis?: string | null
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecommendationUpdateInput = {
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutRecommendationNestedInput
  }

  export type RecommendationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationCreateManyInput = {
    id?: number
    profileId: number
    routine: string
    products: string
    productAnalysis?: string | null
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecommendationUpdateManyMutationInput = {
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    name: string
    brand: string
    category: string
    price?: number
    originalPrice?: number
    discount?: string | null
    skinTypes: string
    skinGoals: string
    description: string
    howToUse: string
    availableAt?: string
    rating?: number
    reviewCount?: number
    ingredients?: string | null
    imageUrl?: string | null
    productUrl?: string | null
    createdAt?: Date | string
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    brand: string
    category: string
    price?: number
    originalPrice?: number
    discount?: string | null
    skinTypes: string
    skinGoals: string
    description: string
    howToUse: string
    availableAt?: string
    rating?: number
    reviewCount?: number
    ingredients?: string | null
    imageUrl?: string | null
    productUrl?: string | null
    createdAt?: Date | string
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    discount?: NullableStringFieldUpdateOperationsInput | string | null
    skinTypes?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    howToUse?: StringFieldUpdateOperationsInput | string
    availableAt?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    discount?: NullableStringFieldUpdateOperationsInput | string | null
    skinTypes?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    howToUse?: StringFieldUpdateOperationsInput | string
    availableAt?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    brand: string
    category: string
    price?: number
    originalPrice?: number
    discount?: string | null
    skinTypes: string
    skinGoals: string
    description: string
    howToUse: string
    availableAt?: string
    rating?: number
    reviewCount?: number
    ingredients?: string | null
    imageUrl?: string | null
    productUrl?: string | null
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    discount?: NullableStringFieldUpdateOperationsInput | string | null
    skinTypes?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    howToUse?: StringFieldUpdateOperationsInput | string
    availableAt?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    discount?: NullableStringFieldUpdateOperationsInput | string | null
    skinTypes?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    howToUse?: StringFieldUpdateOperationsInput | string
    availableAt?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    reviewCount?: IntFieldUpdateOperationsInput | number
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogCreateInput = {
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSkincareLogsInput
  }

  export type SkincareLogUncheckedCreateInput = {
    id?: number
    userId: number
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type SkincareLogUpdateInput = {
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSkincareLogsNestedInput
  }

  export type SkincareLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogCreateManyInput = {
    id?: number
    userId: number
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type SkincareLogUpdateManyMutationInput = {
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Ingredient_ConflictCreateInput = {
    ingredientA: string
    ingredientB: string
    severityLevel: string
    warningMessage: string
    createdAt?: Date | string
  }

  export type Ingredient_ConflictUncheckedCreateInput = {
    id?: number
    ingredientA: string
    ingredientB: string
    severityLevel: string
    warningMessage: string
    createdAt?: Date | string
  }

  export type Ingredient_ConflictUpdateInput = {
    ingredientA?: StringFieldUpdateOperationsInput | string
    ingredientB?: StringFieldUpdateOperationsInput | string
    severityLevel?: StringFieldUpdateOperationsInput | string
    warningMessage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Ingredient_ConflictUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ingredientA?: StringFieldUpdateOperationsInput | string
    ingredientB?: StringFieldUpdateOperationsInput | string
    severityLevel?: StringFieldUpdateOperationsInput | string
    warningMessage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Ingredient_ConflictCreateManyInput = {
    id?: number
    ingredientA: string
    ingredientB: string
    severityLevel: string
    warningMessage: string
    createdAt?: Date | string
  }

  export type Ingredient_ConflictUpdateManyMutationInput = {
    ingredientA?: StringFieldUpdateOperationsInput | string
    ingredientB?: StringFieldUpdateOperationsInput | string
    severityLevel?: StringFieldUpdateOperationsInput | string
    warningMessage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Ingredient_ConflictUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ingredientA?: StringFieldUpdateOperationsInput | string
    ingredientB?: StringFieldUpdateOperationsInput | string
    severityLevel?: StringFieldUpdateOperationsInput | string
    warningMessage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityPostCreateInput = {
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommunityPostsInput
    answers?: CommunityAnswerCreateNestedManyWithoutPostInput
  }

  export type CommunityPostUncheckedCreateInput = {
    id?: number
    userId: number
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
    answers?: CommunityAnswerUncheckedCreateNestedManyWithoutPostInput
  }

  export type CommunityPostUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommunityPostsNestedInput
    answers?: CommunityAnswerUpdateManyWithoutPostNestedInput
  }

  export type CommunityPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: CommunityAnswerUncheckedUpdateManyWithoutPostNestedInput
  }

  export type CommunityPostCreateManyInput = {
    id?: number
    userId: number
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
  }

  export type CommunityPostUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerCreateInput = {
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
    post: CommunityPostCreateNestedOneWithoutAnswersInput
    user: UserCreateNestedOneWithoutCommunityAnswersInput
  }

  export type CommunityAnswerUncheckedCreateInput = {
    id?: number
    postId: number
    userId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerUpdateInput = {
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: CommunityPostUpdateOneRequiredWithoutAnswersNestedInput
    user?: UserUpdateOneRequiredWithoutCommunityAnswersNestedInput
  }

  export type CommunityAnswerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerCreateManyInput = {
    id?: number
    postId: number
    userId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerUpdateManyMutationInput = {
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateInput = {
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentRequestsInput
    receiver: UserCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendRequestUncheckedCreateInput = {
    id?: number
    senderId: number
    receiverId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentRequestsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateManyInput = {
    id?: number
    senderId: number
    receiverId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscoveryCreateInput = {
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiscoveriesInput
    image?: ProductDiscoveryImageCreateNestedOneWithoutDiscoveryInput
  }

  export type ProductDiscoveryUncheckedCreateInput = {
    id?: number
    userId: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: ProductDiscoveryImageUncheckedCreateNestedOneWithoutDiscoveryInput
  }

  export type ProductDiscoveryUpdateInput = {
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiscoveriesNestedInput
    image?: ProductDiscoveryImageUpdateOneWithoutDiscoveryNestedInput
  }

  export type ProductDiscoveryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ProductDiscoveryImageUncheckedUpdateOneWithoutDiscoveryNestedInput
  }

  export type ProductDiscoveryCreateManyInput = {
    id?: number
    userId: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscoveryUpdateManyMutationInput = {
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscoveryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscoveryImageCreateInput = {
    bytes: Bytes
    thumbnail: Bytes
    discovery: ProductDiscoveryCreateNestedOneWithoutImageInput
  }

  export type ProductDiscoveryImageUncheckedCreateInput = {
    discoveryId: number
    bytes: Bytes
    thumbnail: Bytes
  }

  export type ProductDiscoveryImageUpdateInput = {
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
    discovery?: ProductDiscoveryUpdateOneRequiredWithoutImageNestedInput
  }

  export type ProductDiscoveryImageUncheckedUpdateInput = {
    discoveryId?: IntFieldUpdateOperationsInput | number
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
  }

  export type ProductDiscoveryImageCreateManyInput = {
    discoveryId: number
    bytes: Bytes
    thumbnail: Bytes
  }

  export type ProductDiscoveryImageUpdateManyMutationInput = {
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
  }

  export type ProductDiscoveryImageUncheckedUpdateManyInput = {
    discoveryId?: IntFieldUpdateOperationsInput | number
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductDiscoveryListRelationFilter = {
    every?: ProductDiscoveryWhereInput
    some?: ProductDiscoveryWhereInput
    none?: ProductDiscoveryWhereInput
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type SkincareLogListRelationFilter = {
    every?: SkincareLogWhereInput
    some?: SkincareLogWhereInput
    none?: SkincareLogWhereInput
  }

  export type CommunityPostListRelationFilter = {
    every?: CommunityPostWhereInput
    some?: CommunityPostWhereInput
    none?: CommunityPostWhereInput
  }

  export type CommunityAnswerListRelationFilter = {
    every?: CommunityAnswerWhereInput
    some?: CommunityAnswerWhereInput
    none?: CommunityAnswerWhereInput
  }

  export type FriendRequestListRelationFilter = {
    every?: FriendRequestWhereInput
    some?: FriendRequestWhereInput
    none?: FriendRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductDiscoveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkincareLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommunityPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommunityAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    phoneNumber?: SortOrder
    isNewUser?: SortOrder
    username?: SortOrder
    usernameChangedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    phoneNumber?: SortOrder
    isNewUser?: SortOrder
    username?: SortOrder
    usernameChangedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    phoneNumber?: SortOrder
    isNewUser?: SortOrder
    username?: SortOrder
    usernameChangedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RecommendationNullableScalarRelationFilter = {
    is?: RecommendationWhereInput | null
    isNot?: RecommendationWhereInput | null
  }

  export type ProfileOrderByRelevanceInput = {
    fields: ProfileOrderByRelevanceFieldEnum | ProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    skinType?: SortOrder
    skinGoals?: SortOrder
    budget?: SortOrder
    currentProducts?: SortOrder
    currentRoutine?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    budget?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    skinType?: SortOrder
    skinGoals?: SortOrder
    budget?: SortOrder
    currentProducts?: SortOrder
    currentRoutine?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    skinType?: SortOrder
    skinGoals?: SortOrder
    budget?: SortOrder
    currentProducts?: SortOrder
    currentRoutine?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
    budget?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type RecommendationOrderByRelevanceInput = {
    fields: RecommendationOrderByRelevanceFieldEnum | RecommendationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    routine?: SortOrder
    products?: SortOrder
    productAnalysis?: SortOrder
    isEffective?: SortOrder
    hasCurrentProducts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecommendationAvgOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
  }

  export type RecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    routine?: SortOrder
    products?: SortOrder
    productAnalysis?: SortOrder
    isEffective?: SortOrder
    hasCurrentProducts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    routine?: SortOrder
    products?: SortOrder
    productAnalysis?: SortOrder
    isEffective?: SortOrder
    hasCurrentProducts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecommendationSumOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
  }

  export type ProductOrderByRelevanceInput = {
    fields: ProductOrderByRelevanceFieldEnum | ProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    discount?: SortOrder
    skinTypes?: SortOrder
    skinGoals?: SortOrder
    description?: SortOrder
    howToUse?: SortOrder
    availableAt?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    ingredients?: SortOrder
    imageUrl?: SortOrder
    productUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    discount?: SortOrder
    skinTypes?: SortOrder
    skinGoals?: SortOrder
    description?: SortOrder
    howToUse?: SortOrder
    availableAt?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    ingredients?: SortOrder
    imageUrl?: SortOrder
    productUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    discount?: SortOrder
    skinTypes?: SortOrder
    skinGoals?: SortOrder
    description?: SortOrder
    howToUse?: SortOrder
    availableAt?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    ingredients?: SortOrder
    imageUrl?: SortOrder
    productUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type SkincareLogOrderByRelevanceInput = {
    fields: SkincareLogOrderByRelevanceFieldEnum | SkincareLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SkincareLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeOfDay?: SortOrder
    productsUsed?: SortOrder
    notes?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type SkincareLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type SkincareLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeOfDay?: SortOrder
    productsUsed?: SortOrder
    notes?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type SkincareLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeOfDay?: SortOrder
    productsUsed?: SortOrder
    notes?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type SkincareLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type Ingredient_ConflictOrderByRelevanceInput = {
    fields: Ingredient_ConflictOrderByRelevanceFieldEnum | Ingredient_ConflictOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type Ingredient_ConflictIngredientAIngredientBCompoundUniqueInput = {
    ingredientA: string
    ingredientB: string
  }

  export type Ingredient_ConflictCountOrderByAggregateInput = {
    id?: SortOrder
    ingredientA?: SortOrder
    ingredientB?: SortOrder
    severityLevel?: SortOrder
    warningMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type Ingredient_ConflictAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Ingredient_ConflictMaxOrderByAggregateInput = {
    id?: SortOrder
    ingredientA?: SortOrder
    ingredientB?: SortOrder
    severityLevel?: SortOrder
    warningMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type Ingredient_ConflictMinOrderByAggregateInput = {
    id?: SortOrder
    ingredientA?: SortOrder
    ingredientB?: SortOrder
    severityLevel?: SortOrder
    warningMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type Ingredient_ConflictSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CommunityPostOrderByRelevanceInput = {
    fields: CommunityPostOrderByRelevanceFieldEnum | CommunityPostOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CommunityPostCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    details?: SortOrder
    category?: SortOrder
    skinType?: SortOrder
    isAnonymous?: SortOrder
    likes?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityPostAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likes?: SortOrder
  }

  export type CommunityPostMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    details?: SortOrder
    category?: SortOrder
    skinType?: SortOrder
    isAnonymous?: SortOrder
    likes?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityPostMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    details?: SortOrder
    category?: SortOrder
    skinType?: SortOrder
    isAnonymous?: SortOrder
    likes?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityPostSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    likes?: SortOrder
  }

  export type CommunityPostScalarRelationFilter = {
    is?: CommunityPostWhereInput
    isNot?: CommunityPostWhereInput
  }

  export type CommunityAnswerOrderByRelevanceInput = {
    fields: CommunityAnswerOrderByRelevanceFieldEnum | CommunityAnswerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CommunityAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    answer?: SortOrder
    isAnonymous?: SortOrder
    isHelpful?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityAnswerAvgOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    isHelpful?: SortOrder
  }

  export type CommunityAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    answer?: SortOrder
    isAnonymous?: SortOrder
    isHelpful?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    answer?: SortOrder
    isAnonymous?: SortOrder
    isHelpful?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityAnswerSumOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    isHelpful?: SortOrder
  }

  export type FriendRequestOrderByRelevanceInput = {
    fields: FriendRequestOrderByRelevanceFieldEnum | FriendRequestOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FriendRequestSenderIdReceiverIdCompoundUniqueInput = {
    senderId: number
    receiverId: number
  }

  export type FriendRequestCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type FriendRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendRequestMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendRequestSumOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProductDiscoveryImageNullableScalarRelationFilter = {
    is?: ProductDiscoveryImageWhereInput | null
    isNot?: ProductDiscoveryImageWhereInput | null
  }

  export type ProductDiscoveryOrderByRelevanceInput = {
    fields: ProductDiscoveryOrderByRelevanceFieldEnum | ProductDiscoveryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductDiscoveryUserIdProductKeyCompoundUniqueInput = {
    userId: number
    productKey: string
  }

  export type ProductDiscoveryUserIdImageHashCompoundUniqueInput = {
    userId: number
    imageHash: string
  }

  export type ProductDiscoveryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    brand?: SortOrder
    productKey?: SortOrder
    imageHash?: SortOrder
    review?: SortOrder
    rating?: SortOrder
    discoveredOn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscoveryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    version?: SortOrder
  }

  export type ProductDiscoveryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    brand?: SortOrder
    productKey?: SortOrder
    imageHash?: SortOrder
    review?: SortOrder
    rating?: SortOrder
    discoveredOn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscoveryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    brand?: SortOrder
    productKey?: SortOrder
    imageHash?: SortOrder
    review?: SortOrder
    rating?: SortOrder
    discoveredOn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscoverySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    version?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type ProductDiscoveryScalarRelationFilter = {
    is?: ProductDiscoveryWhereInput
    isNot?: ProductDiscoveryWhereInput
  }

  export type ProductDiscoveryImageCountOrderByAggregateInput = {
    discoveryId?: SortOrder
    bytes?: SortOrder
    thumbnail?: SortOrder
  }

  export type ProductDiscoveryImageAvgOrderByAggregateInput = {
    discoveryId?: SortOrder
  }

  export type ProductDiscoveryImageMaxOrderByAggregateInput = {
    discoveryId?: SortOrder
    bytes?: SortOrder
    thumbnail?: SortOrder
  }

  export type ProductDiscoveryImageMinOrderByAggregateInput = {
    discoveryId?: SortOrder
    bytes?: SortOrder
    thumbnail?: SortOrder
  }

  export type ProductDiscoveryImageSumOrderByAggregateInput = {
    discoveryId?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type ProductDiscoveryCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput> | ProductDiscoveryCreateWithoutUserInput[] | ProductDiscoveryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutUserInput | ProductDiscoveryCreateOrConnectWithoutUserInput[]
    createMany?: ProductDiscoveryCreateManyUserInputEnvelope
    connect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type SkincareLogCreateNestedManyWithoutUserInput = {
    create?: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput> | SkincareLogCreateWithoutUserInput[] | SkincareLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkincareLogCreateOrConnectWithoutUserInput | SkincareLogCreateOrConnectWithoutUserInput[]
    createMany?: SkincareLogCreateManyUserInputEnvelope
    connect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
  }

  export type CommunityPostCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput> | CommunityPostCreateWithoutUserInput[] | CommunityPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityPostCreateOrConnectWithoutUserInput | CommunityPostCreateOrConnectWithoutUserInput[]
    createMany?: CommunityPostCreateManyUserInputEnvelope
    connect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
  }

  export type CommunityAnswerCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput> | CommunityAnswerCreateWithoutUserInput[] | CommunityAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutUserInput | CommunityAnswerCreateOrConnectWithoutUserInput[]
    createMany?: CommunityAnswerCreateManyUserInputEnvelope
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput> | ProductDiscoveryCreateWithoutUserInput[] | ProductDiscoveryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutUserInput | ProductDiscoveryCreateOrConnectWithoutUserInput[]
    createMany?: ProductDiscoveryCreateManyUserInputEnvelope
    connect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type SkincareLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput> | SkincareLogCreateWithoutUserInput[] | SkincareLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkincareLogCreateOrConnectWithoutUserInput | SkincareLogCreateOrConnectWithoutUserInput[]
    createMany?: SkincareLogCreateManyUserInputEnvelope
    connect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
  }

  export type CommunityPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput> | CommunityPostCreateWithoutUserInput[] | CommunityPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityPostCreateOrConnectWithoutUserInput | CommunityPostCreateOrConnectWithoutUserInput[]
    createMany?: CommunityPostCreateManyUserInputEnvelope
    connect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
  }

  export type CommunityAnswerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput> | CommunityAnswerCreateWithoutUserInput[] | CommunityAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutUserInput | CommunityAnswerCreateOrConnectWithoutUserInput[]
    createMany?: CommunityAnswerCreateManyUserInputEnvelope
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductDiscoveryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput> | ProductDiscoveryCreateWithoutUserInput[] | ProductDiscoveryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutUserInput | ProductDiscoveryCreateOrConnectWithoutUserInput[]
    upsert?: ProductDiscoveryUpsertWithWhereUniqueWithoutUserInput | ProductDiscoveryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductDiscoveryCreateManyUserInputEnvelope
    set?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    disconnect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    delete?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    connect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    update?: ProductDiscoveryUpdateWithWhereUniqueWithoutUserInput | ProductDiscoveryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductDiscoveryUpdateManyWithWhereWithoutUserInput | ProductDiscoveryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductDiscoveryScalarWhereInput | ProductDiscoveryScalarWhereInput[]
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type SkincareLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput> | SkincareLogCreateWithoutUserInput[] | SkincareLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkincareLogCreateOrConnectWithoutUserInput | SkincareLogCreateOrConnectWithoutUserInput[]
    upsert?: SkincareLogUpsertWithWhereUniqueWithoutUserInput | SkincareLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SkincareLogCreateManyUserInputEnvelope
    set?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    disconnect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    delete?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    connect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    update?: SkincareLogUpdateWithWhereUniqueWithoutUserInput | SkincareLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SkincareLogUpdateManyWithWhereWithoutUserInput | SkincareLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SkincareLogScalarWhereInput | SkincareLogScalarWhereInput[]
  }

  export type CommunityPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput> | CommunityPostCreateWithoutUserInput[] | CommunityPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityPostCreateOrConnectWithoutUserInput | CommunityPostCreateOrConnectWithoutUserInput[]
    upsert?: CommunityPostUpsertWithWhereUniqueWithoutUserInput | CommunityPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityPostCreateManyUserInputEnvelope
    set?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    disconnect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    delete?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    connect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    update?: CommunityPostUpdateWithWhereUniqueWithoutUserInput | CommunityPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityPostUpdateManyWithWhereWithoutUserInput | CommunityPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityPostScalarWhereInput | CommunityPostScalarWhereInput[]
  }

  export type CommunityAnswerUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput> | CommunityAnswerCreateWithoutUserInput[] | CommunityAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutUserInput | CommunityAnswerCreateOrConnectWithoutUserInput[]
    upsert?: CommunityAnswerUpsertWithWhereUniqueWithoutUserInput | CommunityAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityAnswerCreateManyUserInputEnvelope
    set?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    disconnect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    delete?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    update?: CommunityAnswerUpdateWithWhereUniqueWithoutUserInput | CommunityAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityAnswerUpdateManyWithWhereWithoutUserInput | CommunityAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutSenderInput | FriendRequestUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutSenderInput | FriendRequestUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutSenderInput | FriendRequestUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutReceiverInput | FriendRequestUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutReceiverInput | FriendRequestUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutReceiverInput | FriendRequestUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput> | ProductDiscoveryCreateWithoutUserInput[] | ProductDiscoveryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutUserInput | ProductDiscoveryCreateOrConnectWithoutUserInput[]
    upsert?: ProductDiscoveryUpsertWithWhereUniqueWithoutUserInput | ProductDiscoveryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductDiscoveryCreateManyUserInputEnvelope
    set?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    disconnect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    delete?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    connect?: ProductDiscoveryWhereUniqueInput | ProductDiscoveryWhereUniqueInput[]
    update?: ProductDiscoveryUpdateWithWhereUniqueWithoutUserInput | ProductDiscoveryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductDiscoveryUpdateManyWithWhereWithoutUserInput | ProductDiscoveryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductDiscoveryScalarWhereInput | ProductDiscoveryScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type SkincareLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput> | SkincareLogCreateWithoutUserInput[] | SkincareLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkincareLogCreateOrConnectWithoutUserInput | SkincareLogCreateOrConnectWithoutUserInput[]
    upsert?: SkincareLogUpsertWithWhereUniqueWithoutUserInput | SkincareLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SkincareLogCreateManyUserInputEnvelope
    set?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    disconnect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    delete?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    connect?: SkincareLogWhereUniqueInput | SkincareLogWhereUniqueInput[]
    update?: SkincareLogUpdateWithWhereUniqueWithoutUserInput | SkincareLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SkincareLogUpdateManyWithWhereWithoutUserInput | SkincareLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SkincareLogScalarWhereInput | SkincareLogScalarWhereInput[]
  }

  export type CommunityPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput> | CommunityPostCreateWithoutUserInput[] | CommunityPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityPostCreateOrConnectWithoutUserInput | CommunityPostCreateOrConnectWithoutUserInput[]
    upsert?: CommunityPostUpsertWithWhereUniqueWithoutUserInput | CommunityPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityPostCreateManyUserInputEnvelope
    set?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    disconnect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    delete?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    connect?: CommunityPostWhereUniqueInput | CommunityPostWhereUniqueInput[]
    update?: CommunityPostUpdateWithWhereUniqueWithoutUserInput | CommunityPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityPostUpdateManyWithWhereWithoutUserInput | CommunityPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityPostScalarWhereInput | CommunityPostScalarWhereInput[]
  }

  export type CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput> | CommunityAnswerCreateWithoutUserInput[] | CommunityAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutUserInput | CommunityAnswerCreateOrConnectWithoutUserInput[]
    upsert?: CommunityAnswerUpsertWithWhereUniqueWithoutUserInput | CommunityAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityAnswerCreateManyUserInputEnvelope
    set?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    disconnect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    delete?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    update?: CommunityAnswerUpdateWithWhereUniqueWithoutUserInput | CommunityAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityAnswerUpdateManyWithWhereWithoutUserInput | CommunityAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutSenderInput | FriendRequestUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutSenderInput | FriendRequestUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutSenderInput | FriendRequestUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutReceiverInput | FriendRequestUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutReceiverInput | FriendRequestUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutReceiverInput | FriendRequestUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type RecommendationCreateNestedOneWithoutProfileInput = {
    create?: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
    connectOrCreate?: RecommendationCreateOrConnectWithoutProfileInput
    connect?: RecommendationWhereUniqueInput
  }

  export type RecommendationUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
    connectOrCreate?: RecommendationCreateOrConnectWithoutProfileInput
    connect?: RecommendationWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type RecommendationUpdateOneWithoutProfileNestedInput = {
    create?: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
    connectOrCreate?: RecommendationCreateOrConnectWithoutProfileInput
    upsert?: RecommendationUpsertWithoutProfileInput
    disconnect?: RecommendationWhereInput | boolean
    delete?: RecommendationWhereInput | boolean
    connect?: RecommendationWhereUniqueInput
    update?: XOR<XOR<RecommendationUpdateToOneWithWhereWithoutProfileInput, RecommendationUpdateWithoutProfileInput>, RecommendationUncheckedUpdateWithoutProfileInput>
  }

  export type RecommendationUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
    connectOrCreate?: RecommendationCreateOrConnectWithoutProfileInput
    upsert?: RecommendationUpsertWithoutProfileInput
    disconnect?: RecommendationWhereInput | boolean
    delete?: RecommendationWhereInput | boolean
    connect?: RecommendationWhereUniqueInput
    update?: XOR<XOR<RecommendationUpdateToOneWithWhereWithoutProfileInput, RecommendationUpdateWithoutProfileInput>, RecommendationUncheckedUpdateWithoutProfileInput>
  }

  export type ProfileCreateNestedOneWithoutRecommendationInput = {
    create?: XOR<ProfileCreateWithoutRecommendationInput, ProfileUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRecommendationInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutRecommendationNestedInput = {
    create?: XOR<ProfileCreateWithoutRecommendationInput, ProfileUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRecommendationInput
    upsert?: ProfileUpsertWithoutRecommendationInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutRecommendationInput, ProfileUpdateWithoutRecommendationInput>, ProfileUncheckedUpdateWithoutRecommendationInput>
  }

  export type UserCreateNestedOneWithoutSkincareLogsInput = {
    create?: XOR<UserCreateWithoutSkincareLogsInput, UserUncheckedCreateWithoutSkincareLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkincareLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSkincareLogsNestedInput = {
    create?: XOR<UserCreateWithoutSkincareLogsInput, UserUncheckedCreateWithoutSkincareLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkincareLogsInput
    upsert?: UserUpsertWithoutSkincareLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkincareLogsInput, UserUpdateWithoutSkincareLogsInput>, UserUncheckedUpdateWithoutSkincareLogsInput>
  }

  export type UserCreateNestedOneWithoutCommunityPostsInput = {
    create?: XOR<UserCreateWithoutCommunityPostsInput, UserUncheckedCreateWithoutCommunityPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityPostsInput
    connect?: UserWhereUniqueInput
  }

  export type CommunityAnswerCreateNestedManyWithoutPostInput = {
    create?: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput> | CommunityAnswerCreateWithoutPostInput[] | CommunityAnswerUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutPostInput | CommunityAnswerCreateOrConnectWithoutPostInput[]
    createMany?: CommunityAnswerCreateManyPostInputEnvelope
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
  }

  export type CommunityAnswerUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput> | CommunityAnswerCreateWithoutPostInput[] | CommunityAnswerUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutPostInput | CommunityAnswerCreateOrConnectWithoutPostInput[]
    createMany?: CommunityAnswerCreateManyPostInputEnvelope
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCommunityPostsNestedInput = {
    create?: XOR<UserCreateWithoutCommunityPostsInput, UserUncheckedCreateWithoutCommunityPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityPostsInput
    upsert?: UserUpsertWithoutCommunityPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommunityPostsInput, UserUpdateWithoutCommunityPostsInput>, UserUncheckedUpdateWithoutCommunityPostsInput>
  }

  export type CommunityAnswerUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput> | CommunityAnswerCreateWithoutPostInput[] | CommunityAnswerUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutPostInput | CommunityAnswerCreateOrConnectWithoutPostInput[]
    upsert?: CommunityAnswerUpsertWithWhereUniqueWithoutPostInput | CommunityAnswerUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommunityAnswerCreateManyPostInputEnvelope
    set?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    disconnect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    delete?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    update?: CommunityAnswerUpdateWithWhereUniqueWithoutPostInput | CommunityAnswerUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommunityAnswerUpdateManyWithWhereWithoutPostInput | CommunityAnswerUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
  }

  export type CommunityAnswerUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput> | CommunityAnswerCreateWithoutPostInput[] | CommunityAnswerUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommunityAnswerCreateOrConnectWithoutPostInput | CommunityAnswerCreateOrConnectWithoutPostInput[]
    upsert?: CommunityAnswerUpsertWithWhereUniqueWithoutPostInput | CommunityAnswerUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommunityAnswerCreateManyPostInputEnvelope
    set?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    disconnect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    delete?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    connect?: CommunityAnswerWhereUniqueInput | CommunityAnswerWhereUniqueInput[]
    update?: CommunityAnswerUpdateWithWhereUniqueWithoutPostInput | CommunityAnswerUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommunityAnswerUpdateManyWithWhereWithoutPostInput | CommunityAnswerUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
  }

  export type CommunityPostCreateNestedOneWithoutAnswersInput = {
    create?: XOR<CommunityPostCreateWithoutAnswersInput, CommunityPostUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: CommunityPostCreateOrConnectWithoutAnswersInput
    connect?: CommunityPostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommunityAnswersInput = {
    create?: XOR<UserCreateWithoutCommunityAnswersInput, UserUncheckedCreateWithoutCommunityAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityAnswersInput
    connect?: UserWhereUniqueInput
  }

  export type CommunityPostUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<CommunityPostCreateWithoutAnswersInput, CommunityPostUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: CommunityPostCreateOrConnectWithoutAnswersInput
    upsert?: CommunityPostUpsertWithoutAnswersInput
    connect?: CommunityPostWhereUniqueInput
    update?: XOR<XOR<CommunityPostUpdateToOneWithWhereWithoutAnswersInput, CommunityPostUpdateWithoutAnswersInput>, CommunityPostUncheckedUpdateWithoutAnswersInput>
  }

  export type UserUpdateOneRequiredWithoutCommunityAnswersNestedInput = {
    create?: XOR<UserCreateWithoutCommunityAnswersInput, UserUncheckedCreateWithoutCommunityAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityAnswersInput
    upsert?: UserUpsertWithoutCommunityAnswersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommunityAnswersInput, UserUpdateWithoutCommunityAnswersInput>, UserUncheckedUpdateWithoutCommunityAnswersInput>
  }

  export type UserCreateNestedOneWithoutSentRequestsInput = {
    create?: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedRequestsInput = {
    create?: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSentRequestsNestedInput = {
    create?: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRequestsInput
    upsert?: UserUpsertWithoutSentRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentRequestsInput, UserUpdateWithoutSentRequestsInput>, UserUncheckedUpdateWithoutSentRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedRequestsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRequestsInput
    upsert?: UserUpsertWithoutReceivedRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedRequestsInput, UserUpdateWithoutReceivedRequestsInput>, UserUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type UserCreateNestedOneWithoutDiscoveriesInput = {
    create?: XOR<UserCreateWithoutDiscoveriesInput, UserUncheckedCreateWithoutDiscoveriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscoveriesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductDiscoveryImageCreateNestedOneWithoutDiscoveryInput = {
    create?: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
    connectOrCreate?: ProductDiscoveryImageCreateOrConnectWithoutDiscoveryInput
    connect?: ProductDiscoveryImageWhereUniqueInput
  }

  export type ProductDiscoveryImageUncheckedCreateNestedOneWithoutDiscoveryInput = {
    create?: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
    connectOrCreate?: ProductDiscoveryImageCreateOrConnectWithoutDiscoveryInput
    connect?: ProductDiscoveryImageWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDiscoveriesNestedInput = {
    create?: XOR<UserCreateWithoutDiscoveriesInput, UserUncheckedCreateWithoutDiscoveriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscoveriesInput
    upsert?: UserUpsertWithoutDiscoveriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiscoveriesInput, UserUpdateWithoutDiscoveriesInput>, UserUncheckedUpdateWithoutDiscoveriesInput>
  }

  export type ProductDiscoveryImageUpdateOneWithoutDiscoveryNestedInput = {
    create?: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
    connectOrCreate?: ProductDiscoveryImageCreateOrConnectWithoutDiscoveryInput
    upsert?: ProductDiscoveryImageUpsertWithoutDiscoveryInput
    disconnect?: ProductDiscoveryImageWhereInput | boolean
    delete?: ProductDiscoveryImageWhereInput | boolean
    connect?: ProductDiscoveryImageWhereUniqueInput
    update?: XOR<XOR<ProductDiscoveryImageUpdateToOneWithWhereWithoutDiscoveryInput, ProductDiscoveryImageUpdateWithoutDiscoveryInput>, ProductDiscoveryImageUncheckedUpdateWithoutDiscoveryInput>
  }

  export type ProductDiscoveryImageUncheckedUpdateOneWithoutDiscoveryNestedInput = {
    create?: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
    connectOrCreate?: ProductDiscoveryImageCreateOrConnectWithoutDiscoveryInput
    upsert?: ProductDiscoveryImageUpsertWithoutDiscoveryInput
    disconnect?: ProductDiscoveryImageWhereInput | boolean
    delete?: ProductDiscoveryImageWhereInput | boolean
    connect?: ProductDiscoveryImageWhereUniqueInput
    update?: XOR<XOR<ProductDiscoveryImageUpdateToOneWithWhereWithoutDiscoveryInput, ProductDiscoveryImageUpdateWithoutDiscoveryInput>, ProductDiscoveryImageUncheckedUpdateWithoutDiscoveryInput>
  }

  export type ProductDiscoveryCreateNestedOneWithoutImageInput = {
    create?: XOR<ProductDiscoveryCreateWithoutImageInput, ProductDiscoveryUncheckedCreateWithoutImageInput>
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutImageInput
    connect?: ProductDiscoveryWhereUniqueInput
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Bytes
  }

  export type ProductDiscoveryUpdateOneRequiredWithoutImageNestedInput = {
    create?: XOR<ProductDiscoveryCreateWithoutImageInput, ProductDiscoveryUncheckedCreateWithoutImageInput>
    connectOrCreate?: ProductDiscoveryCreateOrConnectWithoutImageInput
    upsert?: ProductDiscoveryUpsertWithoutImageInput
    connect?: ProductDiscoveryWhereUniqueInput
    update?: XOR<XOR<ProductDiscoveryUpdateToOneWithWhereWithoutImageInput, ProductDiscoveryUpdateWithoutImageInput>, ProductDiscoveryUncheckedUpdateWithoutImageInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[]
    notIn?: Bytes[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type ProductDiscoveryCreateWithoutUserInput = {
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: ProductDiscoveryImageCreateNestedOneWithoutDiscoveryInput
  }

  export type ProductDiscoveryUncheckedCreateWithoutUserInput = {
    id?: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: ProductDiscoveryImageUncheckedCreateNestedOneWithoutDiscoveryInput
  }

  export type ProductDiscoveryCreateOrConnectWithoutUserInput = {
    where: ProductDiscoveryWhereUniqueInput
    create: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput>
  }

  export type ProductDiscoveryCreateManyUserInputEnvelope = {
    data: ProductDiscoveryCreateManyUserInput | ProductDiscoveryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recommendation?: RecommendationCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: number
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recommendation?: RecommendationUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type SkincareLogCreateWithoutUserInput = {
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type SkincareLogUncheckedCreateWithoutUserInput = {
    id?: number
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type SkincareLogCreateOrConnectWithoutUserInput = {
    where: SkincareLogWhereUniqueInput
    create: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput>
  }

  export type SkincareLogCreateManyUserInputEnvelope = {
    data: SkincareLogCreateManyUserInput | SkincareLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommunityPostCreateWithoutUserInput = {
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
    answers?: CommunityAnswerCreateNestedManyWithoutPostInput
  }

  export type CommunityPostUncheckedCreateWithoutUserInput = {
    id?: number
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
    answers?: CommunityAnswerUncheckedCreateNestedManyWithoutPostInput
  }

  export type CommunityPostCreateOrConnectWithoutUserInput = {
    where: CommunityPostWhereUniqueInput
    create: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput>
  }

  export type CommunityPostCreateManyUserInputEnvelope = {
    data: CommunityPostCreateManyUserInput | CommunityPostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommunityAnswerCreateWithoutUserInput = {
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
    post: CommunityPostCreateNestedOneWithoutAnswersInput
  }

  export type CommunityAnswerUncheckedCreateWithoutUserInput = {
    id?: number
    postId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerCreateOrConnectWithoutUserInput = {
    where: CommunityAnswerWhereUniqueInput
    create: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput>
  }

  export type CommunityAnswerCreateManyUserInputEnvelope = {
    data: CommunityAnswerCreateManyUserInput | CommunityAnswerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutSenderInput = {
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutSenderInput = {
    id?: number
    receiverId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput>
  }

  export type FriendRequestCreateManySenderInputEnvelope = {
    data: FriendRequestCreateManySenderInput | FriendRequestCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutReceiverInput = {
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutReceiverInput = {
    id?: number
    senderId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput>
  }

  export type FriendRequestCreateManyReceiverInputEnvelope = {
    data: FriendRequestCreateManyReceiverInput | FriendRequestCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type ProductDiscoveryUpsertWithWhereUniqueWithoutUserInput = {
    where: ProductDiscoveryWhereUniqueInput
    update: XOR<ProductDiscoveryUpdateWithoutUserInput, ProductDiscoveryUncheckedUpdateWithoutUserInput>
    create: XOR<ProductDiscoveryCreateWithoutUserInput, ProductDiscoveryUncheckedCreateWithoutUserInput>
  }

  export type ProductDiscoveryUpdateWithWhereUniqueWithoutUserInput = {
    where: ProductDiscoveryWhereUniqueInput
    data: XOR<ProductDiscoveryUpdateWithoutUserInput, ProductDiscoveryUncheckedUpdateWithoutUserInput>
  }

  export type ProductDiscoveryUpdateManyWithWhereWithoutUserInput = {
    where: ProductDiscoveryScalarWhereInput
    data: XOR<ProductDiscoveryUpdateManyMutationInput, ProductDiscoveryUncheckedUpdateManyWithoutUserInput>
  }

  export type ProductDiscoveryScalarWhereInput = {
    AND?: ProductDiscoveryScalarWhereInput | ProductDiscoveryScalarWhereInput[]
    OR?: ProductDiscoveryScalarWhereInput[]
    NOT?: ProductDiscoveryScalarWhereInput | ProductDiscoveryScalarWhereInput[]
    id?: IntFilter<"ProductDiscovery"> | number
    userId?: IntFilter<"ProductDiscovery"> | number
    productName?: StringFilter<"ProductDiscovery"> | string
    brand?: StringFilter<"ProductDiscovery"> | string
    productKey?: StringFilter<"ProductDiscovery"> | string
    imageHash?: StringFilter<"ProductDiscovery"> | string
    review?: StringFilter<"ProductDiscovery"> | string
    rating?: IntNullableFilter<"ProductDiscovery"> | number | null
    discoveredOn?: StringFilter<"ProductDiscovery"> | string
    version?: IntFilter<"ProductDiscovery"> | number
    createdAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscovery"> | Date | string
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendation?: RecommendationUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendation?: RecommendationUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type SkincareLogUpsertWithWhereUniqueWithoutUserInput = {
    where: SkincareLogWhereUniqueInput
    update: XOR<SkincareLogUpdateWithoutUserInput, SkincareLogUncheckedUpdateWithoutUserInput>
    create: XOR<SkincareLogCreateWithoutUserInput, SkincareLogUncheckedCreateWithoutUserInput>
  }

  export type SkincareLogUpdateWithWhereUniqueWithoutUserInput = {
    where: SkincareLogWhereUniqueInput
    data: XOR<SkincareLogUpdateWithoutUserInput, SkincareLogUncheckedUpdateWithoutUserInput>
  }

  export type SkincareLogUpdateManyWithWhereWithoutUserInput = {
    where: SkincareLogScalarWhereInput
    data: XOR<SkincareLogUpdateManyMutationInput, SkincareLogUncheckedUpdateManyWithoutUserInput>
  }

  export type SkincareLogScalarWhereInput = {
    AND?: SkincareLogScalarWhereInput | SkincareLogScalarWhereInput[]
    OR?: SkincareLogScalarWhereInput[]
    NOT?: SkincareLogScalarWhereInput | SkincareLogScalarWhereInput[]
    id?: IntFilter<"SkincareLog"> | number
    userId?: IntFilter<"SkincareLog"> | number
    timeOfDay?: StringFilter<"SkincareLog"> | string
    productsUsed?: StringFilter<"SkincareLog"> | string
    notes?: StringNullableFilter<"SkincareLog"> | string | null
    photo?: StringNullableFilter<"SkincareLog"> | string | null
    createdAt?: DateTimeFilter<"SkincareLog"> | Date | string
  }

  export type CommunityPostUpsertWithWhereUniqueWithoutUserInput = {
    where: CommunityPostWhereUniqueInput
    update: XOR<CommunityPostUpdateWithoutUserInput, CommunityPostUncheckedUpdateWithoutUserInput>
    create: XOR<CommunityPostCreateWithoutUserInput, CommunityPostUncheckedCreateWithoutUserInput>
  }

  export type CommunityPostUpdateWithWhereUniqueWithoutUserInput = {
    where: CommunityPostWhereUniqueInput
    data: XOR<CommunityPostUpdateWithoutUserInput, CommunityPostUncheckedUpdateWithoutUserInput>
  }

  export type CommunityPostUpdateManyWithWhereWithoutUserInput = {
    where: CommunityPostScalarWhereInput
    data: XOR<CommunityPostUpdateManyMutationInput, CommunityPostUncheckedUpdateManyWithoutUserInput>
  }

  export type CommunityPostScalarWhereInput = {
    AND?: CommunityPostScalarWhereInput | CommunityPostScalarWhereInput[]
    OR?: CommunityPostScalarWhereInput[]
    NOT?: CommunityPostScalarWhereInput | CommunityPostScalarWhereInput[]
    id?: IntFilter<"CommunityPost"> | number
    userId?: IntFilter<"CommunityPost"> | number
    question?: StringFilter<"CommunityPost"> | string
    details?: StringNullableFilter<"CommunityPost"> | string | null
    category?: StringFilter<"CommunityPost"> | string
    skinType?: StringNullableFilter<"CommunityPost"> | string | null
    isAnonymous?: BoolFilter<"CommunityPost"> | boolean
    likes?: IntFilter<"CommunityPost"> | number
    createdAt?: DateTimeFilter<"CommunityPost"> | Date | string
  }

  export type CommunityAnswerUpsertWithWhereUniqueWithoutUserInput = {
    where: CommunityAnswerWhereUniqueInput
    update: XOR<CommunityAnswerUpdateWithoutUserInput, CommunityAnswerUncheckedUpdateWithoutUserInput>
    create: XOR<CommunityAnswerCreateWithoutUserInput, CommunityAnswerUncheckedCreateWithoutUserInput>
  }

  export type CommunityAnswerUpdateWithWhereUniqueWithoutUserInput = {
    where: CommunityAnswerWhereUniqueInput
    data: XOR<CommunityAnswerUpdateWithoutUserInput, CommunityAnswerUncheckedUpdateWithoutUserInput>
  }

  export type CommunityAnswerUpdateManyWithWhereWithoutUserInput = {
    where: CommunityAnswerScalarWhereInput
    data: XOR<CommunityAnswerUpdateManyMutationInput, CommunityAnswerUncheckedUpdateManyWithoutUserInput>
  }

  export type CommunityAnswerScalarWhereInput = {
    AND?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
    OR?: CommunityAnswerScalarWhereInput[]
    NOT?: CommunityAnswerScalarWhereInput | CommunityAnswerScalarWhereInput[]
    id?: IntFilter<"CommunityAnswer"> | number
    postId?: IntFilter<"CommunityAnswer"> | number
    userId?: IntFilter<"CommunityAnswer"> | number
    answer?: StringFilter<"CommunityAnswer"> | string
    isAnonymous?: BoolFilter<"CommunityAnswer"> | boolean
    isHelpful?: IntFilter<"CommunityAnswer"> | number
    createdAt?: DateTimeFilter<"CommunityAnswer"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutSenderInput, FriendRequestUncheckedUpdateWithoutSenderInput>
    create: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutSenderInput, FriendRequestUncheckedUpdateWithoutSenderInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutSenderInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutSenderInput>
  }

  export type FriendRequestScalarWhereInput = {
    AND?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    OR?: FriendRequestScalarWhereInput[]
    NOT?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    id?: IntFilter<"FriendRequest"> | number
    senderId?: IntFilter<"FriendRequest"> | number
    receiverId?: IntFilter<"FriendRequest"> | number
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutReceiverInput, FriendRequestUncheckedUpdateWithoutReceiverInput>
    create: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutReceiverInput, FriendRequestUncheckedUpdateWithoutReceiverInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutReceiverInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutReceiverInput>
  }

  export type UserCreateWithoutProfileInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type RecommendationCreateWithoutProfileInput = {
    routine: string
    products: string
    productAnalysis?: string | null
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecommendationUncheckedCreateWithoutProfileInput = {
    id?: number
    routine: string
    products: string
    productAnalysis?: string | null
    isEffective?: boolean
    hasCurrentProducts?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecommendationCreateOrConnectWithoutProfileInput = {
    where: RecommendationWhereUniqueInput
    create: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type RecommendationUpsertWithoutProfileInput = {
    update: XOR<RecommendationUpdateWithoutProfileInput, RecommendationUncheckedUpdateWithoutProfileInput>
    create: XOR<RecommendationCreateWithoutProfileInput, RecommendationUncheckedCreateWithoutProfileInput>
    where?: RecommendationWhereInput
  }

  export type RecommendationUpdateToOneWithWhereWithoutProfileInput = {
    where?: RecommendationWhereInput
    data: XOR<RecommendationUpdateWithoutProfileInput, RecommendationUncheckedUpdateWithoutProfileInput>
  }

  export type RecommendationUpdateWithoutProfileInput = {
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    routine?: StringFieldUpdateOperationsInput | string
    products?: StringFieldUpdateOperationsInput | string
    productAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    isEffective?: BoolFieldUpdateOperationsInput | boolean
    hasCurrentProducts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateWithoutRecommendationInput = {
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutRecommendationInput = {
    id?: number
    userId: number
    age: number
    gender: string
    skinType: string
    skinGoals: string
    budget: number
    currentProducts?: string | null
    currentRoutine?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutRecommendationInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutRecommendationInput, ProfileUncheckedCreateWithoutRecommendationInput>
  }

  export type ProfileUpsertWithoutRecommendationInput = {
    update: XOR<ProfileUpdateWithoutRecommendationInput, ProfileUncheckedUpdateWithoutRecommendationInput>
    create: XOR<ProfileCreateWithoutRecommendationInput, ProfileUncheckedCreateWithoutRecommendationInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutRecommendationInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutRecommendationInput, ProfileUncheckedUpdateWithoutRecommendationInput>
  }

  export type ProfileUpdateWithoutRecommendationInput = {
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutRecommendationInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    skinType?: StringFieldUpdateOperationsInput | string
    skinGoals?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    currentProducts?: NullableStringFieldUpdateOperationsInput | string | null
    currentRoutine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSkincareLogsInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutSkincareLogsInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutSkincareLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkincareLogsInput, UserUncheckedCreateWithoutSkincareLogsInput>
  }

  export type UserUpsertWithoutSkincareLogsInput = {
    update: XOR<UserUpdateWithoutSkincareLogsInput, UserUncheckedUpdateWithoutSkincareLogsInput>
    create: XOR<UserCreateWithoutSkincareLogsInput, UserUncheckedCreateWithoutSkincareLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkincareLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkincareLogsInput, UserUncheckedUpdateWithoutSkincareLogsInput>
  }

  export type UserUpdateWithoutSkincareLogsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutSkincareLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserCreateWithoutCommunityPostsInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutCommunityPostsInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutCommunityPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommunityPostsInput, UserUncheckedCreateWithoutCommunityPostsInput>
  }

  export type CommunityAnswerCreateWithoutPostInput = {
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommunityAnswersInput
  }

  export type CommunityAnswerUncheckedCreateWithoutPostInput = {
    id?: number
    userId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerCreateOrConnectWithoutPostInput = {
    where: CommunityAnswerWhereUniqueInput
    create: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput>
  }

  export type CommunityAnswerCreateManyPostInputEnvelope = {
    data: CommunityAnswerCreateManyPostInput | CommunityAnswerCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCommunityPostsInput = {
    update: XOR<UserUpdateWithoutCommunityPostsInput, UserUncheckedUpdateWithoutCommunityPostsInput>
    create: XOR<UserCreateWithoutCommunityPostsInput, UserUncheckedCreateWithoutCommunityPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommunityPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommunityPostsInput, UserUncheckedUpdateWithoutCommunityPostsInput>
  }

  export type UserUpdateWithoutCommunityPostsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutCommunityPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type CommunityAnswerUpsertWithWhereUniqueWithoutPostInput = {
    where: CommunityAnswerWhereUniqueInput
    update: XOR<CommunityAnswerUpdateWithoutPostInput, CommunityAnswerUncheckedUpdateWithoutPostInput>
    create: XOR<CommunityAnswerCreateWithoutPostInput, CommunityAnswerUncheckedCreateWithoutPostInput>
  }

  export type CommunityAnswerUpdateWithWhereUniqueWithoutPostInput = {
    where: CommunityAnswerWhereUniqueInput
    data: XOR<CommunityAnswerUpdateWithoutPostInput, CommunityAnswerUncheckedUpdateWithoutPostInput>
  }

  export type CommunityAnswerUpdateManyWithWhereWithoutPostInput = {
    where: CommunityAnswerScalarWhereInput
    data: XOR<CommunityAnswerUpdateManyMutationInput, CommunityAnswerUncheckedUpdateManyWithoutPostInput>
  }

  export type CommunityPostCreateWithoutAnswersInput = {
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommunityPostsInput
  }

  export type CommunityPostUncheckedCreateWithoutAnswersInput = {
    id?: number
    userId: number
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
  }

  export type CommunityPostCreateOrConnectWithoutAnswersInput = {
    where: CommunityPostWhereUniqueInput
    create: XOR<CommunityPostCreateWithoutAnswersInput, CommunityPostUncheckedCreateWithoutAnswersInput>
  }

  export type UserCreateWithoutCommunityAnswersInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutCommunityAnswersInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutCommunityAnswersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommunityAnswersInput, UserUncheckedCreateWithoutCommunityAnswersInput>
  }

  export type CommunityPostUpsertWithoutAnswersInput = {
    update: XOR<CommunityPostUpdateWithoutAnswersInput, CommunityPostUncheckedUpdateWithoutAnswersInput>
    create: XOR<CommunityPostCreateWithoutAnswersInput, CommunityPostUncheckedCreateWithoutAnswersInput>
    where?: CommunityPostWhereInput
  }

  export type CommunityPostUpdateToOneWithWhereWithoutAnswersInput = {
    where?: CommunityPostWhereInput
    data: XOR<CommunityPostUpdateWithoutAnswersInput, CommunityPostUncheckedUpdateWithoutAnswersInput>
  }

  export type CommunityPostUpdateWithoutAnswersInput = {
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommunityPostsNestedInput
  }

  export type CommunityPostUncheckedUpdateWithoutAnswersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCommunityAnswersInput = {
    update: XOR<UserUpdateWithoutCommunityAnswersInput, UserUncheckedUpdateWithoutCommunityAnswersInput>
    create: XOR<UserCreateWithoutCommunityAnswersInput, UserUncheckedCreateWithoutCommunityAnswersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommunityAnswersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommunityAnswersInput, UserUncheckedUpdateWithoutCommunityAnswersInput>
  }

  export type UserUpdateWithoutCommunityAnswersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutCommunityAnswersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserCreateWithoutSentRequestsInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutSentRequestsInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutSentRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
  }

  export type UserCreateWithoutReceivedRequestsInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutReceivedRequestsInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    discoveries?: ProductDiscoveryUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutReceivedRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
  }

  export type UserUpsertWithoutSentRequestsInput = {
    update: XOR<UserUpdateWithoutSentRequestsInput, UserUncheckedUpdateWithoutSentRequestsInput>
    create: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentRequestsInput, UserUncheckedUpdateWithoutSentRequestsInput>
  }

  export type UserUpdateWithoutSentRequestsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutSentRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type UserUpsertWithoutReceivedRequestsInput = {
    update: XOR<UserUpdateWithoutReceivedRequestsInput, UserUncheckedUpdateWithoutReceivedRequestsInput>
    create: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedRequestsInput, UserUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type UserUpdateWithoutReceivedRequestsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discoveries?: ProductDiscoveryUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateWithoutDiscoveriesInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutDiscoveriesInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    googleId?: string | null
    phoneNumber?: string | null
    isNewUser?: boolean
    username?: string | null
    usernameChangedAt?: Date | string | null
    createdAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    skincareLogs?: SkincareLogUncheckedCreateNestedManyWithoutUserInput
    communityPosts?: CommunityPostUncheckedCreateNestedManyWithoutUserInput
    communityAnswers?: CommunityAnswerUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutDiscoveriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiscoveriesInput, UserUncheckedCreateWithoutDiscoveriesInput>
  }

  export type ProductDiscoveryImageCreateWithoutDiscoveryInput = {
    bytes: Bytes
    thumbnail: Bytes
  }

  export type ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput = {
    bytes: Bytes
    thumbnail: Bytes
  }

  export type ProductDiscoveryImageCreateOrConnectWithoutDiscoveryInput = {
    where: ProductDiscoveryImageWhereUniqueInput
    create: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
  }

  export type UserUpsertWithoutDiscoveriesInput = {
    update: XOR<UserUpdateWithoutDiscoveriesInput, UserUncheckedUpdateWithoutDiscoveriesInput>
    create: XOR<UserCreateWithoutDiscoveriesInput, UserUncheckedCreateWithoutDiscoveriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiscoveriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiscoveriesInput, UserUncheckedUpdateWithoutDiscoveriesInput>
  }

  export type UserUpdateWithoutDiscoveriesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutDiscoveriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isNewUser?: BoolFieldUpdateOperationsInput | boolean
    username?: NullableStringFieldUpdateOperationsInput | string | null
    usernameChangedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    skincareLogs?: SkincareLogUncheckedUpdateManyWithoutUserNestedInput
    communityPosts?: CommunityPostUncheckedUpdateManyWithoutUserNestedInput
    communityAnswers?: CommunityAnswerUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type ProductDiscoveryImageUpsertWithoutDiscoveryInput = {
    update: XOR<ProductDiscoveryImageUpdateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedUpdateWithoutDiscoveryInput>
    create: XOR<ProductDiscoveryImageCreateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedCreateWithoutDiscoveryInput>
    where?: ProductDiscoveryImageWhereInput
  }

  export type ProductDiscoveryImageUpdateToOneWithWhereWithoutDiscoveryInput = {
    where?: ProductDiscoveryImageWhereInput
    data: XOR<ProductDiscoveryImageUpdateWithoutDiscoveryInput, ProductDiscoveryImageUncheckedUpdateWithoutDiscoveryInput>
  }

  export type ProductDiscoveryImageUpdateWithoutDiscoveryInput = {
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
  }

  export type ProductDiscoveryImageUncheckedUpdateWithoutDiscoveryInput = {
    bytes?: BytesFieldUpdateOperationsInput | Bytes
    thumbnail?: BytesFieldUpdateOperationsInput | Bytes
  }

  export type ProductDiscoveryCreateWithoutImageInput = {
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiscoveriesInput
  }

  export type ProductDiscoveryUncheckedCreateWithoutImageInput = {
    id?: number
    userId: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscoveryCreateOrConnectWithoutImageInput = {
    where: ProductDiscoveryWhereUniqueInput
    create: XOR<ProductDiscoveryCreateWithoutImageInput, ProductDiscoveryUncheckedCreateWithoutImageInput>
  }

  export type ProductDiscoveryUpsertWithoutImageInput = {
    update: XOR<ProductDiscoveryUpdateWithoutImageInput, ProductDiscoveryUncheckedUpdateWithoutImageInput>
    create: XOR<ProductDiscoveryCreateWithoutImageInput, ProductDiscoveryUncheckedCreateWithoutImageInput>
    where?: ProductDiscoveryWhereInput
  }

  export type ProductDiscoveryUpdateToOneWithWhereWithoutImageInput = {
    where?: ProductDiscoveryWhereInput
    data: XOR<ProductDiscoveryUpdateWithoutImageInput, ProductDiscoveryUncheckedUpdateWithoutImageInput>
  }

  export type ProductDiscoveryUpdateWithoutImageInput = {
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiscoveriesNestedInput
  }

  export type ProductDiscoveryUncheckedUpdateWithoutImageInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscoveryCreateManyUserInput = {
    id?: number
    productName: string
    brand: string
    productKey: string
    imageHash: string
    review: string
    rating?: number | null
    discoveredOn: string
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkincareLogCreateManyUserInput = {
    id?: number
    timeOfDay: string
    productsUsed: string
    notes?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type CommunityPostCreateManyUserInput = {
    id?: number
    question: string
    details?: string | null
    category: string
    skinType?: string | null
    isAnonymous?: boolean
    likes?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerCreateManyUserInput = {
    id?: number
    postId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type FriendRequestCreateManySenderInput = {
    id?: number
    receiverId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateManyReceiverInput = {
    id?: number
    senderId: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscoveryUpdateWithoutUserInput = {
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ProductDiscoveryImageUpdateOneWithoutDiscoveryNestedInput
  }

  export type ProductDiscoveryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ProductDiscoveryImageUncheckedUpdateOneWithoutDiscoveryNestedInput
  }

  export type ProductDiscoveryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    productKey?: StringFieldUpdateOperationsInput | string
    imageHash?: StringFieldUpdateOperationsInput | string
    review?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    discoveredOn?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogUpdateWithoutUserInput = {
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkincareLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    timeOfDay?: StringFieldUpdateOperationsInput | string
    productsUsed?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityPostUpdateWithoutUserInput = {
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: CommunityAnswerUpdateManyWithoutPostNestedInput
  }

  export type CommunityPostUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: CommunityAnswerUncheckedUpdateManyWithoutPostNestedInput
  }

  export type CommunityPostUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skinType?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerUpdateWithoutUserInput = {
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: CommunityPostUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type CommunityAnswerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutSenderInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutReceiverInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerCreateManyPostInput = {
    id?: number
    userId: number
    answer: string
    isAnonymous?: boolean
    isHelpful?: number
    createdAt?: Date | string
  }

  export type CommunityAnswerUpdateWithoutPostInput = {
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommunityAnswersNestedInput
  }

  export type CommunityAnswerUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityAnswerUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    answer?: StringFieldUpdateOperationsInput | string
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    isHelpful?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}