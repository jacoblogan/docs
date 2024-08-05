import { useContext } from 'react';
import { TypeContext } from "./ReferencePages";
import { View, Flex } from '@aws-amplify/ui-react';

export const TypeLink = ({ linkData }) => {
  const { setModalData } = useContext(TypeContext);
  const name = linkData.name || linkData.local;

  const onClickHandler = () => {
    setModalData(linkData);
  }

  if (linkData.type === 'application') {
    return <ApplicationType data={linkData} />
  } else if (linkData.type === 'interface' || linkData.type === 'object') {
    return <Type typeData={linkData} />
  } else {
    return <a onClick={onClickHandler}>{name}</a>
  }
}

export const Type = ({ typeData }) => {
  const type = typeData?.type;
  let retValue;
  switch (type) {
    case 'reference':
      retValue = <ReferenceType data={typeData} />
      break;
    case 'intersection':
      retValue = <IntersectionType data={typeData} />
      break;
    case 'union':
      retValue = <UnionType data={typeData} />
      break;
    case 'alias':
      retValue = <AliasType data={typeData} />
      break;
    case 'application':
      retValue = <ApplicationType data={typeData} />
      break;
    case 'object':
    case 'interface':
      retValue = <InterfaceType data={typeData} />
      break;
    case 'identifier':
      retValue = <IdentifierType data={typeData} />
      break;
    case 'string':
      retValue = <StringType data={typeData} />
      break;
    case 'property':
      retValue = <PropertyType data={typeData} />
      break;
    default:
      retValue = <div>Type Component Not Found for {type}</div>
      break;
  }
  return retValue;
}

const ReferenceType = ({ data }) => {
  // should be a link that loads the next type when clicked on
  return <TypeLink linkData={data} />
}

const IntersectionType = ({ data }) => {
  // should iterate over types putting & between and rendering each one
  return (
    <View>
      {data.types.map((t, idx) => {
        return (<View key={idx}><TypeLink linkData={t} /> {idx < data.types.length - 1 && <span>&</span>} </View>)
      })}
    </View>
  )
}

const UnionType = ({ data }) => {
  // should iterate over types putting | between and rendering each one
  return (
    <View>
      {data.elements.map((t, idx) => {
        return (<View key={idx}><TypeLink linkData={t} /> {idx < data.elements.length - 1 && <span>|</span>} </View>)
      })}
    </View>
  )
}

const AliasType = ({ data }) => {
  // should render the type object contained in value
  return (<Type typeData={data.value} />)
}

const ApplicationType = ({ data }) => {
  // example of application SomeType<AnotherType> it should render the "base" and "typeParameters"
  const params = data.typeParameters.map((param, idx) => {
    if (param.type === 'reference') {
      return <><TypeLink linkData={param} />{idx < data.typeParameters.length - 1 ? ', ' : ''}</>
    } else {
      return <><code>{param.name || param.type}</code>{idx < data.typeParameters.length - 1 ? ', ' : ''}</>
    }
  });
  return (
    <View>
      <TypeLink linkData={data.base} /> &lt; {params} &gt;
    </View>
  )
}

const InterfaceType = ({ data }) => {
  // should render the "properties" as types
  return (
    <View>
      {Object.keys(data.properties).map((key, idx) => {
        return (
          <Flex key={idx}>
            {data.properties[key].name}: <Type typeData={data.properties[key]} />
          </Flex>
        )
      })}
    </View>
  )
}

const IdentifierType = ({ data }) => {
  // should render the "typeObject" as a type if no typeObject exists then this is an end node
  if (!data.typeObject) {
    return <code>{data.name}</code>
  } else {
    return <Type typeData={data.typeObject} />
  }
}

const StringType = ({ }) => {
  return (<code>string</code>)
}

const PropertyType = ({ data }) => {
  if (data.value.name) {
    return <TypeLink linkData={data.value} />
  } else {
    return (
      <View>
        <Type typeData={data.value} />
      </View>
    )
  }
}
