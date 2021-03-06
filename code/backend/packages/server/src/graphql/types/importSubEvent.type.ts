import { ImporterFile, ImportSubEvent } from '@badvlasim/shared/models';
import { GraphQLInt, GraphQLObjectType } from 'graphql';
import { attributeFields, createConnection } from 'graphql-sequelize';
import { getAttributeFields } from './attributes.type';

const ImportedSubEventType = new GraphQLObjectType({
  name: 'ImportedSubEvent',
  description: 'A Imported subevent',
  fields: () => Object.assign(getAttributeFields(ImportSubEvent), {})
});

const ImportedSubEventConnectionType = createConnection({
  name: 'ImportedSubEvent',
  nodeType: ImportedSubEventType,
  target: ImportSubEvent,
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: ({ fullCount }) => fullCount
    }
  }
});

export { ImportedSubEventType, ImportedSubEventConnectionType };
