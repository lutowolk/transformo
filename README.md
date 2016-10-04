# Transformo JS

Transform one plain object to another with detail scheme. Tools for 
transform data object from scheme and row data to new object. You can 
validate row data, transform this, set default value and create new object.

See usage section.

## Usage

```
import { formo } from 'transformo'

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
    newFoo: formo.shape({
        id: formo.field({
            path: 'foo.bar.id',
            type: formo.number().required()
        }),
        name: formo.field({
            path: 'foo.bar.name',
            type: formo.string(),
            defaultValue: 'Unknown'
        }),
        image: formo.field({
            path: 'foo.bar.image',
            type: formo.string(),
            transform: (value) => `http://site.com/${value}`
        }),
        difficult: formo.field({
            type: formo.string().required(),
            getSourceValue: (data) => _.get(data, 'foo.bar.some.field')
        })
    }) 
};

const fooModel = formo.model(shape, source);

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