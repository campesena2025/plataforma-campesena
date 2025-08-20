import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiActividadPlanActividadPlan
  extends Struct.CollectionTypeSchema {
  collectionName: 'actividad_plans';
  info: {
    displayName: 'ActividadPlan';
    pluralName: 'actividad-plans';
    singularName: 'actividad-plan';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actividadPropuesta: Schema.Attribute.Text;
    aspecto: Schema.Attribute.Enumeration<
      ['Operacion', 'Mercadeo', 'Organizacional', 'Ambiental']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    hallazgo: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::actividad-plan.actividad-plan'
    > &
      Schema.Attribute.Private;
    plan_de_accion: Schema.Attribute.Relation<
      'manyToOne',
      'api::plan-de-accion.plan-de-accion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    seguimiento_actividad: Schema.Attribute.Relation<
      'oneToOne',
      'api::seguimiento-actividad.seguimiento-actividad'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAsociacionAsociacion extends Struct.CollectionTypeSchema {
  collectionName: 'asociacions';
  info: {
    displayName: 'Asociacion';
    pluralName: 'asociacions';
    singularName: 'asociacion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoCIUU: Schema.Attribute.String;
    codigoInterno: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    evaluacion_diagnosticos: Schema.Attribute.Relation<
      'oneToMany',
      'api::evaluacion-diagnostico.evaluacion-diagnostico'
    >;
    formalizada: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::asociacion.asociacion'
    > &
      Schema.Attribute.Private;
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    nit: Schema.Attribute.String & Schema.Attribute.Unique;
    nombreAsociacion: Schema.Attribute.Text;
    participante_asociacions: Schema.Attribute.Relation<
      'oneToMany',
      'api::participante-asociacion.participante-asociacion'
    >;
    productoServicio: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    razonCreacion: Schema.Attribute.Text;
    sector: Schema.Attribute.Enumeration<
      [
        'Cosntrucci\u00F3n',
        'Cultura',
        'Empresarial',
        'Forestal',
        'Gastronom\u00EDa',
        'Industria',
        'Otros',
        'Pecuario',
        'Pisc\u00EDcola',
        'Turismo',
        'Servicios',
      ]
    >;
    tipoOrganizacion: Schema.Attribute.Enumeration<
      [
        'Cabildos Indigenas',
        'Consejos Comunitarios',
        'Empresas Comunitarias',
        'kumpanias',
        'Asociacion',
        'Cooperativa',
        'Precooperativa',
        'Sociedades agrarias de transformacion',
        'Comunidad organizada',
        'Comunidad sin organizar',
        'Otro',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vereda: Schema.Attribute.Relation<'oneToOne', 'api::vereda.vereda'>;
  };
}

export interface ApiCentroFormacionCentroFormacion
  extends Struct.CollectionTypeSchema {
  collectionName: 'centro_formacions';
  info: {
    displayName: 'CentroFormacion';
    pluralName: 'centro-formacions';
    singularName: 'centro-formacion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigo: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::centro-formacion.centro-formacion'
    > &
      Schema.Attribute.Private;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    regional: Schema.Attribute.Relation<'manyToOne', 'api::regional.regional'>;
    servicio_participantes: Schema.Attribute.Relation<
      'oneToMany',
      'api::servicio-participante.servicio-participante'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCostoCosto extends Struct.CollectionTypeSchema {
  collectionName: 'costos';
  info: {
    displayName: 'Costo';
    pluralName: 'costos';
    singularName: 'costo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cantidad: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::costo.costo'> &
      Schema.Attribute.Private;
    modelo_negocio: Schema.Attribute.Relation<
      'manyToOne',
      'api::modelo-negocio.modelo-negocio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    tipo: Schema.Attribute.Enumeration<['Costo Fijo', 'Costo Variable']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    valor: Schema.Attribute.Decimal;
  };
}

export interface ApiCriterioEvaluacionCriterioEvaluacion
  extends Struct.CollectionTypeSchema {
  collectionName: 'criterio_evaluacions';
  info: {
    displayName: 'criterioEvaluacion';
    pluralName: 'criterio-evaluacions';
    singularName: 'criterio-evaluacion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::criterio-evaluacion.criterio-evaluacion'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    respuesta_criterios: Schema.Attribute.Relation<
      'oneToMany',
      'api::respuesta-criterio.respuesta-criterio'
    >;
    seccion_diagnostico: Schema.Attribute.Relation<
      'manyToOne',
      'api::seccion-diagnostico.seccion-diagnostico'
    >;
    textoPregunta: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDatoMensualProyeccionDatoMensualProyeccion
  extends Struct.CollectionTypeSchema {
  collectionName: 'dato_mensual_proyeccions';
  info: {
    displayName: 'DatoMensualProyeccion';
    pluralName: 'dato-mensual-proyeccions';
    singularName: 'dato-mensual-proyeccion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dato-mensual-proyeccion.dato-mensual-proyeccion'
    > &
      Schema.Attribute.Private;
    mes: Schema.Attribute.Integer;
    proyeccion_financiera: Schema.Attribute.Relation<
      'manyToOne',
      'api::proyeccion-financiera.proyeccion-financiera'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDepartamentoDepartamento
  extends Struct.CollectionTypeSchema {
  collectionName: 'departamentos';
  info: {
    displayName: 'Departamento';
    pluralName: 'departamentos';
    singularName: 'departamento';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    abreviatura: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    divipola: Schema.Attribute.String;
    latitud: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::departamento.departamento'
    > &
      Schema.Attribute.Private;
    longitud: Schema.Attribute.String;
    municipios: Schema.Attribute.Relation<
      'oneToMany',
      'api::municipio.municipio'
    >;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    regionGeografica: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    zonaSena: Schema.Attribute.String;
  };
}

export interface ApiDiagnosticoPlantillaDiagnosticoPlantilla
  extends Struct.CollectionTypeSchema {
  collectionName: 'diagnostico_plantillas';
  info: {
    displayName: 'DiagnosticoPlantilla';
    pluralName: 'diagnostico-plantillas';
    singularName: 'diagnostico-plantilla';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    evaluacion_diagnosticos: Schema.Attribute.Relation<
      'oneToMany',
      'api::evaluacion-diagnostico.evaluacion-diagnostico'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::diagnostico-plantilla.diagnostico-plantilla'
    > &
      Schema.Attribute.Private;
    nombrePlantilla: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seccion_diagnosticos: Schema.Attribute.Relation<
      'oneToMany',
      'api::seccion-diagnostico.seccion-diagnostico'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    version: Schema.Attribute.String;
  };
}

export interface ApiEvaluacionDiagnosticoEvaluacionDiagnostico
  extends Struct.CollectionTypeSchema {
  collectionName: 'evaluacion_diagnosticos';
  info: {
    displayName: 'EvaluacionDiagnostico';
    pluralName: 'evaluacion-diagnosticos';
    singularName: 'evaluacion-diagnostico';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    asociacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::asociacion.asociacion'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diagnostico_plantilla: Schema.Attribute.Relation<
      'manyToOne',
      'api::diagnostico-plantilla.diagnostico-plantilla'
    >;
    fechaAplicacion: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::evaluacion-diagnostico.evaluacion-diagnostico'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    respuesta_criterios: Schema.Attribute.Relation<
      'oneToMany',
      'api::respuesta-criterio.respuesta-criterio'
    >;
    tipoDiagnostico: Schema.Attribute.Enumeration<['Inicial', 'Final']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFlujoCajaAnualFlujoCajaAnual
  extends Struct.CollectionTypeSchema {
  collectionName: 'flujo_caja_anuals';
  info: {
    displayName: 'FlujoCajaAnual';
    pluralName: 'flujo-caja-anuals';
    singularName: 'flujo-caja-anual';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ano: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::flujo-caja-anual.flujo-caja-anual'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    resumen_mensual_cajas: Schema.Attribute.Relation<
      'oneToMany',
      'api::resumen-mensual-caja.resumen-mensual-caja'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFormacionFormacion extends Struct.CollectionTypeSchema {
  collectionName: 'formacions';
  info: {
    displayName: 'Formacion';
    pluralName: 'formacions';
    singularName: 'formacion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    codigoDiseno: Schema.Attribute.String;
    codigoFormacion: Schema.Attribute.String;
    codigoSofia: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::formacion.formacion'
    > &
      Schema.Attribute.Private;
    nombreDiseno: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    servicio_participantes: Schema.Attribute.Relation<
      'oneToMany',
      'api::servicio-participante.servicio-participante'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    versionDiseno: Schema.Attribute.String;
  };
}

export interface ApiInversionInversion extends Struct.CollectionTypeSchema {
  collectionName: 'inversions';
  info: {
    displayName: 'Inversion';
    pluralName: 'inversions';
    singularName: 'inversion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::inversion.inversion'
    > &
      Schema.Attribute.Private;
    modelo_negocio: Schema.Attribute.Relation<
      'manyToOne',
      'api::modelo-negocio.modelo-negocio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    tipoInversion: Schema.Attribute.Enumeration<
      ['Inicial', 'Capital de Trabajo']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiModeloNegocioModeloNegocio
  extends Struct.CollectionTypeSchema {
  collectionName: 'modelo_negocios';
  info: {
    displayName: 'ModeloNegocio';
    pluralName: 'modelo-negocios';
    singularName: 'modelo-negocio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actividadesClave: Schema.Attribute.Text;
    alianzas: Schema.Attribute.Text;
    canales: Schema.Attribute.Text;
    costos: Schema.Attribute.Relation<'oneToMany', 'api::costo.costo'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    estructuraCosto: Schema.Attribute.Text;
    FuentesIngreso: Schema.Attribute.Text;
    inversions: Schema.Attribute.Relation<
      'oneToMany',
      'api::inversion.inversion'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::modelo-negocio.modelo-negocio'
    > &
      Schema.Attribute.Private;
    mision: Schema.Attribute.Text;
    propuestaValor: Schema.Attribute.Text;
    proyeccion_financieras: Schema.Attribute.Relation<
      'oneToMany',
      'api::proyeccion-financiera.proyeccion-financiera'
    >;
    proyecto_productivo: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyecto-productivo.proyecto-productivo'
    >;
    publishedAt: Schema.Attribute.DateTime;
    recursosClave: Schema.Attribute.Text;
    relacionesClientes: Schema.Attribute.Text;
    segmentosMercado: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vision: Schema.Attribute.Text;
  };
}

export interface ApiMovimientoCajaMovimientoCaja
  extends Struct.CollectionTypeSchema {
  collectionName: 'movimiento_cajas';
  info: {
    displayName: 'MovimientoCaja';
    pluralName: 'movimiento-cajas';
    singularName: 'movimiento-caja';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.Text;
    fechaMovimiento: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::movimiento-caja.movimiento-caja'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    resumen_mensual_caja: Schema.Attribute.Relation<
      'manyToOne',
      'api::resumen-mensual-caja.resumen-mensual-caja'
    >;
    tipoMovimiento: Schema.Attribute.Enumeration<
      ['Ingreso', 'Egreso Fijo', 'Egreso Variable']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMunicipioMunicipio extends Struct.CollectionTypeSchema {
  collectionName: 'municipios';
  info: {
    displayName: 'Municipio';
    pluralName: 'municipios';
    singularName: 'municipio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    asociacion: Schema.Attribute.Relation<
      'oneToOne',
      'api::asociacion.asociacion'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departamento: Schema.Attribute.Relation<
      'manyToOne',
      'api::departamento.departamento'
    >;
    divipola: Schema.Attribute.String;
    latitud: Schema.Attribute.Decimal;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::municipio.municipio'
    > &
      Schema.Attribute.Private;
    longitud: Schema.Attribute.Decimal;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    restitucionTierras: Schema.Attribute.Boolean;
    ruralidad: Schema.Attribute.Enumeration<
      ['Rural', 'Rural disperso', 'Intermedio', 'Ciudades y aglomeraciones']
    >;
    servicio_participante: Schema.Attribute.Relation<
      'oneToOne',
      'api::servicio-participante.servicio-participante'
    >;
    subregion_pdet: Schema.Attribute.Relation<
      'oneToOne',
      'api::subregion-pdet.subregion-pdet'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    veredas: Schema.Attribute.Relation<'oneToMany', 'api::vereda.vereda'>;
    zonaConflicto: Schema.Attribute.Boolean;
    zonaReformaRural: Schema.Attribute.Enumeration<
      ['No ZNRA', 'Cordoba', 'Sucre', 'Magdalena Medio', 'La Guajira']
    >;
    zonas_reserva_campesina: Schema.Attribute.Relation<
      'oneToOne',
      'api::zonas-reserva-campesina.zonas-reserva-campesina'
    >;
  };
}

export interface ApiParticipanteAsociacionParticipanteAsociacion
  extends Struct.CollectionTypeSchema {
  collectionName: 'participante_asociacions';
  info: {
    displayName: 'ParticipanteAsociacion';
    pluralName: 'participante-asociacions';
    singularName: 'participante-asociacion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    asociacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::asociacion.asociacion'
    >;
    conocimientoTecnico: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    habilidadesGerenciales: Schema.Attribute.Boolean;
    ingresosMensuales: Schema.Attribute.Decimal;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::participante-asociacion.participante-asociacion'
    > &
      Schema.Attribute.Private;
    participante: Schema.Attribute.Relation<
      'oneToOne',
      'api::participante.participante'
    >;
    publishedAt: Schema.Attribute.DateTime;
    rolAsociacion: Schema.Attribute.String;
    servicio_participantes: Schema.Attribute.Relation<
      'oneToMany',
      'api::servicio-participante.servicio-participante'
    >;
    temasInteres: Schema.Attribute.Text;
    tiempoAsociacion: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiParticipanteParticipante
  extends Struct.CollectionTypeSchema {
  collectionName: 'participantes';
  info: {
    displayName: 'Participante';
    pluralName: 'participantes';
    singularName: 'participante';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    correoElectronico: Schema.Attribute.Email;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    edad: Schema.Attribute.Integer;
    genero: Schema.Attribute.Enumeration<
      ['Masculino', 'Femenino', 'No Binario']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::participante.participante'
    > &
      Schema.Attribute.Private;
    nivelEstudio: Schema.Attribute.Enumeration<
      ['Ninguno', 'Primaria', 'B\u00E1sica', 'Profesional', 'Postgrado']
    >;
    nombreCompleto: Schema.Attribute.String;
    numeroContacto: Schema.Attribute.Integer;
    numeroDocumento: Schema.Attribute.String;
    participante_asociacion: Schema.Attribute.Relation<
      'oneToOne',
      'api::participante-asociacion.participante-asociacion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    tipoParticipante: Schema.Attribute.Enumeration<
      ['Representante Legal', 'Participante Asociacion', 'Otro']
    >;
    tipoPoblacion: Schema.Attribute.Enumeration<
      [
        'VULNERABLE',
        'PALENQUERO',
        'RAIZAL',
        'AFROCOLOMBIANO',
        'AFROCOLOMBIANOS_DESPLAZADOS_POR_LA_VIOLENCIA',
        'CABEZA DE FAMILIA',
        'ARTESANOS',
        'DESPLAZADOS_DISCAPACITADOS',
        'MUJERCABEZA DE_AMILIA',
        'DESPLAZADOS_POR_FENOMENOS_NATURALES',
        'DISCAPACITADO COGNITIVO',
        'DESPLAZADOS POR LA VIOLENCIA',
        'DESPLAZADOS_POR LA VIOLENCIA CABEZA DE FAMILIA',
        'JOVEN RURAL',
        'DISCAPACITADO_LIMITACION_FISICA',
        'SOBREVIVIENTES MINAS ANTIPERSONALES',
        'DISCAPACIDAD LIMITACION AUDITIVA',
        'DISCAPACIDAD LIMITACION VISUAL',
        'DISCAPACIDAD_MENTAL',
        'EN CONDICION DE DISCAPACIDAD',
        'ROM ',
        'NEGRITUDES',
        'EMPRENDEDOR',
        'INDIGENAS',
        'PROC_REINTEGRACION / REINCORPORACION',
        'INDIGENAS_DESPLAZADOS_POR_LA VIOLENCIA',
        'INDIGENAS DESPLAZADOS POR LA VIOLENCIA CABEZA DE FAMILIA',
        'INPEC',
        'JOVENES_VULNERABLES',
        'SOLDADOS_CAMPESINOS',
        'TERCERA_EDAD',
        'CAMPESINO',
        'NINGUNA',
        'PEQUE\u00D1O PRODUCTOR',
        'OTRO',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlanDeAccionPlanDeAccion
  extends Struct.CollectionTypeSchema {
  collectionName: 'plan_de_accions';
  info: {
    displayName: 'PlanDeAccion';
    pluralName: 'plan-de-accions';
    singularName: 'plan-de-accion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actividad_plans: Schema.Attribute.Relation<
      'oneToMany',
      'api::actividad-plan.actividad-plan'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fechaElaboracion: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::plan-de-accion.plan-de-accion'
    > &
      Schema.Attribute.Private;
    proyecto_productivo: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyecto-productivo.proyecto-productivo'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlanMercadeoPlanMercadeo
  extends Struct.CollectionTypeSchema {
  collectionName: 'plan_mercadeos';
  info: {
    displayName: 'PlanMercadeo';
    pluralName: 'plan-mercadeos';
    singularName: 'plan-mercadeo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    analisisCompetencia: Schema.Attribute.Text;
    analisisMercado: Schema.Attribute.Text;
    analisisProyecto: Schema.Attribute.Text;
    analisisSector: Schema.Attribute.Text;
    concepto: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    estrategiaComunicacion: Schema.Attribute.Text;
    estrategiaPrecio: Schema.Attribute.Text;
    estrategiaServicio: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::plan-mercadeo.plan-mercadeo'
    > &
      Schema.Attribute.Private;
    objetivos: Schema.Attribute.Text;
    posicionamiento: Schema.Attribute.Text;
    propuestaMercadeo: Schema.Attribute.Text;
    propuestaValor: Schema.Attribute.Text;
    proyecto_productivo: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyecto-productivo.proyecto-productivo'
    >;
    publishedAt: Schema.Attribute.DateTime;
    segmentoClientes: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ventajaCompetitiva: Schema.Attribute.Text;
  };
}

export interface ApiPortafolioPortafolio extends Struct.CollectionTypeSchema {
  collectionName: 'portafolios';
  info: {
    displayName: 'Portafolio';
    pluralName: 'portafolios';
    singularName: 'portafolio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    caracterisiticasFisicas: Schema.Attribute.Text;
    caracteristicasSensoriales: Schema.Attribute.Text;
    caracteristicasServicio: Schema.Attribute.Text;
    codigoUNSPSC: Schema.Attribute.String;
    componentesServicio: Schema.Attribute.Text;
    composicionProducto: Schema.Attribute.Text;
    conceptoSanitario: Schema.Attribute.String;
    condicionesConservacion: Schema.Attribute.Text;
    condicionesServicio: Schema.Attribute.String;
    costoServicio: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Decreto: Schema.Attribute.String;
    descripcion: Schema.Attribute.Text;
    horarioAtencion: Schema.Attribute.String;
    latitud: Schema.Attribute.Decimal;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::portafolio.portafolio'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    longitud: Schema.Attribute.Decimal;
    magnitud: Schema.Attribute.String;
    nombre: Schema.Attribute.String;
    nombreComercial: Schema.Attribute.String;
    normaTecnica: Schema.Attribute.String;
    precauciones: Schema.Attribute.Text;
    presentacionComercial: Schema.Attribute.Text;
    proyecto_productivo: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyecto-productivo.proyecto-productivo'
    >;
    publishedAt: Schema.Attribute.DateTime;
    recomendacionesServicio: Schema.Attribute.Text;
    resolucion: Schema.Attribute.String;
    resolucionRotulado: Schema.Attribute.String;
    tipoPortafolio: Schema.Attribute.Enumeration<['Producto', 'Servicio']>;
    unidadMedida: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    uso: Schema.Attribute.String;
    vidaUtil: Schema.Attribute.Integer;
  };
}

export interface ApiProyeccionFinancieraProyeccionFinanciera
  extends Struct.CollectionTypeSchema {
  collectionName: 'proyeccion_financieras';
  info: {
    displayName: 'ProyeccionFinanciera';
    pluralName: 'proyeccion-financieras';
    singularName: 'proyeccion-financiera';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    anoProyeccion: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dato_mensual_proyeccions: Schema.Attribute.Relation<
      'oneToMany',
      'api::dato-mensual-proyeccion.dato-mensual-proyeccion'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::proyeccion-financiera.proyeccion-financiera'
    > &
      Schema.Attribute.Private;
    modelo_negocio: Schema.Attribute.Relation<
      'manyToOne',
      'api::modelo-negocio.modelo-negocio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProyectoProductivoProyectoProductivo
  extends Struct.CollectionTypeSchema {
  collectionName: 'proyecto_productivos';
  info: {
    displayName: 'ProyectoProductivo';
    pluralName: 'proyecto-productivos';
    singularName: 'proyecto-productivo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    analisisTendencias: Schema.Attribute.Text;
    beneficiarios: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    factoresEconomicos: Schema.Attribute.Text;
    factoresPoliticos: Schema.Attribute.String;
    factoresSociales: Schema.Attribute.Text;
    factoresTecnologicos: Schema.Attribute.Text;
    impactoAmbiental: Schema.Attribute.Text;
    impactoEconomico: Schema.Attribute.Text;
    impactoSocial: Schema.Attribute.Text;
    impactoTecnologico: Schema.Attribute.Text;
    incertidumbres: Schema.Attribute.Text;
    justificacion: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::proyecto-productivo.proyecto-productivo'
    > &
      Schema.Attribute.Private;
    modelo_negocio: Schema.Attribute.Relation<
      'oneToOne',
      'api::modelo-negocio.modelo-negocio'
    >;
    nombreProyecto: Schema.Attribute.Text;
    plan_de_accion: Schema.Attribute.Relation<
      'oneToOne',
      'api::plan-de-accion.plan-de-accion'
    >;
    plan_mercadeo: Schema.Attribute.Relation<
      'oneToOne',
      'api::plan-mercadeo.plan-mercadeo'
    >;
    Planteamiento: Schema.Attribute.Text;
    portafolio: Schema.Attribute.Relation<
      'oneToOne',
      'api::portafolio.portafolio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    servicio_participante: Schema.Attribute.Relation<
      'oneToOne',
      'api::servicio-participante.servicio-participante'
    >;
    tiempoEstimado: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRegionalRegional extends Struct.CollectionTypeSchema {
  collectionName: 'regionals';
  info: {
    displayName: 'Regional';
    pluralName: 'regionals';
    singularName: 'regional';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    centro_formacions: Schema.Attribute.Relation<
      'oneToMany',
      'api::centro-formacion.centro-formacion'
    >;
    codigo: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::regional.regional'
    > &
      Schema.Attribute.Private;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRespuestaCriterioRespuestaCriterio
  extends Struct.CollectionTypeSchema {
  collectionName: 'respuesta_criterios';
  info: {
    displayName: 'respuestaCriterio';
    pluralName: 'respuesta-criterios';
    singularName: 'respuesta-criterio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    criterio_evaluacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::criterio-evaluacion.criterio-evaluacion'
    >;
    evaluacion_diagnostico: Schema.Attribute.Relation<
      'manyToOne',
      'api::evaluacion-diagnostico.evaluacion-diagnostico'
    >;
    hallazgos: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::respuesta-criterio.respuesta-criterio'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    puntaje: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiResumenMensualCajaResumenMensualCaja
  extends Struct.CollectionTypeSchema {
  collectionName: 'resumen_mensual_cajas';
  info: {
    displayName: 'ResumenMensualCaja';
    pluralName: 'resumen-mensual-cajas';
    singularName: 'resumen-mensual-caja';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    flujo_caja_anual: Schema.Attribute.Relation<
      'manyToOne',
      'api::flujo-caja-anual.flujo-caja-anual'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::resumen-mensual-caja.resumen-mensual-caja'
    > &
      Schema.Attribute.Private;
    mes: Schema.Attribute.Integer;
    movimiento_cajas: Schema.Attribute.Relation<
      'oneToMany',
      'api::movimiento-caja.movimiento-caja'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSeccionDiagnosticoSeccionDiagnostico
  extends Struct.CollectionTypeSchema {
  collectionName: 'seccion_diagnosticos';
  info: {
    displayName: 'SeccionDiagnostico';
    pluralName: 'seccion-diagnosticos';
    singularName: 'seccion-diagnostico';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    criterio_evaluacions: Schema.Attribute.Relation<
      'oneToMany',
      'api::criterio-evaluacion.criterio-evaluacion'
    >;
    diagnostico_plantilla: Schema.Attribute.Relation<
      'manyToOne',
      'api::diagnostico-plantilla.diagnostico-plantilla'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::seccion-diagnostico.seccion-diagnostico'
    > &
      Schema.Attribute.Private;
    nombreSeccion: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSeguimientoActividadSeguimientoActividad
  extends Struct.CollectionTypeSchema {
  collectionName: 'seguimiento_actividads';
  info: {
    displayName: 'SeguimientoActividad';
    pluralName: 'seguimiento-actividads';
    singularName: 'seguimiento-actividad';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    acciones: Schema.Attribute.Text;
    actividad_plan: Schema.Attribute.Relation<
      'oneToOne',
      'api::actividad-plan.actividad-plan'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cumplimiento: Schema.Attribute.Decimal;
    descripcion: Schema.Attribute.Text;
    fechaFin: Schema.Attribute.DateTime;
    fechaInicio: Schema.Attribute.DateTime;
    justificacion: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::seguimiento-actividad.seguimiento-actividad'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    responsable: Schema.Attribute.String;
    ubicacion: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServicioParticipanteServicioParticipante
  extends Struct.CollectionTypeSchema {
  collectionName: 'servicio_participantes';
  info: {
    displayName: 'ServicioParticipante';
    pluralName: 'servicio-participantes';
    singularName: 'servicio-participante';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    centro_formacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::centro-formacion.centro-formacion'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fechaInicio: Schema.Attribute.Date;
    formacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::formacion.formacion'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::servicio-participante.servicio-participante'
    > &
      Schema.Attribute.Private;
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    numeroFicha: Schema.Attribute.String;
    participante_asociacion: Schema.Attribute.Relation<
      'manyToOne',
      'api::participante-asociacion.participante-asociacion'
    >;
    proyecto_productivo: Schema.Attribute.Relation<
      'oneToOne',
      'api::proyecto-productivo.proyecto-productivo'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vereda: Schema.Attribute.Relation<'oneToOne', 'api::vereda.vereda'>;
  };
}

export interface ApiServicioServicio extends Struct.CollectionTypeSchema {
  collectionName: 'servicios';
  info: {
    displayName: 'Servicio';
    pluralName: 'servicios';
    singularName: 'servicio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ano: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::servicio.servicio'
    > &
      Schema.Attribute.Private;
    nombreServicio: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubregionPdetSubregionPdet
  extends Struct.CollectionTypeSchema {
  collectionName: 'subregion_pdets';
  info: {
    displayName: 'SubregionPdet';
    pluralName: 'subregion-pdets';
    singularName: 'subregion-pdet';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    abreviacion: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subregion-pdet.subregion-pdet'
    > &
      Schema.Attribute.Private;
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVeredaVereda extends Struct.CollectionTypeSchema {
  collectionName: 'veredas';
  info: {
    displayName: 'Vereda';
    pluralName: 'veredas';
    singularName: 'vereda';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    asociacion: Schema.Attribute.Relation<
      'oneToOne',
      'api::asociacion.asociacion'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    divipola: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vereda.vereda'
    > &
      Schema.Attribute.Private;
    municipio: Schema.Attribute.Relation<
      'manyToOne',
      'api::municipio.municipio'
    >;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    servicio_participante: Schema.Attribute.Relation<
      'oneToOne',
      'api::servicio-participante.servicio-participante'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZonaSenaZonaSena extends Struct.CollectionTypeSchema {
  collectionName: 'zona_senas';
  info: {
    displayName: 'zonaSena';
    pluralName: 'zona-senas';
    singularName: 'zona-sena';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zona-sena.zona-sena'
    > &
      Schema.Attribute.Private;
    nombre: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZonasReservaCampesinaZonasReservaCampesina
  extends Struct.CollectionTypeSchema {
  collectionName: 'zonas_reserva_campesinas';
  info: {
    displayName: 'ZonasReservaCampesina';
    pluralName: 'zonas-reserva-campesinas';
    singularName: 'zonas-reserva-campesina';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    descripcion: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zonas-reserva-campesina.zonas-reserva-campesina'
    > &
      Schema.Attribute.Private;
    municipio: Schema.Attribute.Relation<
      'oneToOne',
      'api::municipio.municipio'
    >;
    publishedAt: Schema.Attribute.DateTime;
    resolucion: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::actividad-plan.actividad-plan': ApiActividadPlanActividadPlan;
      'api::asociacion.asociacion': ApiAsociacionAsociacion;
      'api::centro-formacion.centro-formacion': ApiCentroFormacionCentroFormacion;
      'api::costo.costo': ApiCostoCosto;
      'api::criterio-evaluacion.criterio-evaluacion': ApiCriterioEvaluacionCriterioEvaluacion;
      'api::dato-mensual-proyeccion.dato-mensual-proyeccion': ApiDatoMensualProyeccionDatoMensualProyeccion;
      'api::departamento.departamento': ApiDepartamentoDepartamento;
      'api::diagnostico-plantilla.diagnostico-plantilla': ApiDiagnosticoPlantillaDiagnosticoPlantilla;
      'api::evaluacion-diagnostico.evaluacion-diagnostico': ApiEvaluacionDiagnosticoEvaluacionDiagnostico;
      'api::flujo-caja-anual.flujo-caja-anual': ApiFlujoCajaAnualFlujoCajaAnual;
      'api::formacion.formacion': ApiFormacionFormacion;
      'api::inversion.inversion': ApiInversionInversion;
      'api::modelo-negocio.modelo-negocio': ApiModeloNegocioModeloNegocio;
      'api::movimiento-caja.movimiento-caja': ApiMovimientoCajaMovimientoCaja;
      'api::municipio.municipio': ApiMunicipioMunicipio;
      'api::participante-asociacion.participante-asociacion': ApiParticipanteAsociacionParticipanteAsociacion;
      'api::participante.participante': ApiParticipanteParticipante;
      'api::plan-de-accion.plan-de-accion': ApiPlanDeAccionPlanDeAccion;
      'api::plan-mercadeo.plan-mercadeo': ApiPlanMercadeoPlanMercadeo;
      'api::portafolio.portafolio': ApiPortafolioPortafolio;
      'api::proyeccion-financiera.proyeccion-financiera': ApiProyeccionFinancieraProyeccionFinanciera;
      'api::proyecto-productivo.proyecto-productivo': ApiProyectoProductivoProyectoProductivo;
      'api::regional.regional': ApiRegionalRegional;
      'api::respuesta-criterio.respuesta-criterio': ApiRespuestaCriterioRespuestaCriterio;
      'api::resumen-mensual-caja.resumen-mensual-caja': ApiResumenMensualCajaResumenMensualCaja;
      'api::seccion-diagnostico.seccion-diagnostico': ApiSeccionDiagnosticoSeccionDiagnostico;
      'api::seguimiento-actividad.seguimiento-actividad': ApiSeguimientoActividadSeguimientoActividad;
      'api::servicio-participante.servicio-participante': ApiServicioParticipanteServicioParticipante;
      'api::servicio.servicio': ApiServicioServicio;
      'api::subregion-pdet.subregion-pdet': ApiSubregionPdetSubregionPdet;
      'api::vereda.vereda': ApiVeredaVereda;
      'api::zona-sena.zona-sena': ApiZonaSenaZonaSena;
      'api::zonas-reserva-campesina.zonas-reserva-campesina': ApiZonasReservaCampesinaZonasReservaCampesina;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
