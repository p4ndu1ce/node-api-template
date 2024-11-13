export const CreateProductSchema = {
  $id: 'CreateProductSchemaID',
  type: 'object',
  required: [
    'name',
    'description',
    'specifications',
    'price',
    'images',
    'level'
  ],
  properties: {
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