export const CreateUserSchema = {
  $id: 'CreateProductSchemaID',
  type: 'object',
  required: [
    'id',
    'name',
    'description',
    'specifications',
    'price',
    'images',
    'level'
  ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    specifications: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    price: {
      currency: { type: 'string' },
      value: { type: 'number' },
    },
    images: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    level: { type: 'number' },
  }
}