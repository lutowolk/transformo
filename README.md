# Transform JS

Transform one plain object to another with detail scheme. Tools for 
transform data object from scheme and row data to new object. You can 
validate row data, transform this, set default value and create new object.

See usage section.

## Usage

```
import { scheme, types } from 'scheme-model'

const source = {
    foo: {
        bar: {
            id: 0,
            name: undefined,
            image: 'image.jpg',
            some: {
                field: 'custom'
            }
        }
    }
};

const shape = {
    newFoo: scheme.shape({
        id: scheme.field({
            path: 'foo.bar.id',
            type: types.number().required()
        }),
        name: scheme.field({
            path: 'foo.bar.name',
            type: types.string(),
            defaultValue: 'Unknown'
        }),
        image: scheme.field({
            path: 'foo.bar.image',
            type: types.string(),
            transform: (value) => `http://site.com/${value}`
        }),
        difficult: scheme.field({
            type: types.string().required(),
            getSourceValue: (data) => _.get(data, 'foo.bar.some.field')
        })
    }) 
};

const fooModel = scheme.model(shape, source);

fooModel
    .invalid((errors) => ...)
    
fooModel
    .valid((values) => ...)
    
fooModel
    .data()
    
fooModel
    .isValid()
    
fooModel
    .isInvalid()

console.log(fooData);    

// {
//    newFoo: {
//        id: 0,
//        name: 'Unknown',
//        image: 'http://site.com/image.jpg',
//        difficult: 'custom'           
//    }
// }
```