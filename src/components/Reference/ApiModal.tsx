import { View, Flex, Heading, Card, Divider, Text, Button } from '@aws-amplify/ui-react'
import { IconX } from '../Icons'
import { Type } from './TypeLink';

export const ApiModal = ({ data, showModal, close }) => {
  let name = data.name || data.local;
  let typeParameters = data.typeParameters;
  if (data?.typeObject?.type == 'alias' && data.typeObject.typeParameters) {
    typeParameters = data.typeObject.typeParameters;
  } else if (data?.typeObject?.type == 'interface' && data.typeObject.typeParameters && data.typeObject.name == data.name) {
    typeParameters = data.typeObject.typeParameters;
  }
  const params = typeParameters?.map((p) => {
    return p.name;
  });
  if (params && params.length) {
    name += `<${params.join(',')}>`
  }
  const typeData = data.typeObject || data.value;
  // look for objects or interfaces to render additional data
  const displayProperties = {};
  function recursivelyParseType(typeData, displayProperties) {
    if (!typeData) return;
    if (typeData.type === 'alias') {
      recursivelyParseType(typeData.value, displayProperties);
    } else if (typeData.type === 'intersection') {
      for (let key in typeData.types) {
        recursivelyParseType(typeData.types[key], displayProperties);
      }
    } else if (typeData.type === 'union') {
      for (let key in typeData.elements) {
        recursivelyParseType(typeData.elements[key], displayProperties);
      }
    } else if (typeData.type === 'object' || typeData.type === 'interface') {
      Object.keys(typeData.properties).forEach((key) => {
        if (typeData.properties[key].description) { // only add displayProperties that have a description to be displayed
          displayProperties[key] = typeData.properties[key];
        }
      });
    }
  }
  recursivelyParseType(typeData, displayProperties);

  let displayTypes;
  if (Object.keys(displayProperties).length) {
    displayTypes = Object.keys(displayProperties).map((key) => {
      return <DisplayType data={displayProperties[key]} />
    });
  }
  return (
    <View
      display={showModal ? 'block' : 'none'}
      position="fixed"
      top="10%"
      left="20%"
      style={{ zIndex: 999 }}
    >
      <Card
        borderRadius="medium"
        maxWidth="60rem"
        variation="outlined"
      >
        <View padding="xs" fontSize="large">
          <Flex justifyContent="space-between">
            <Heading padding="large" level={2} >{name}</Heading>
            <Button onClick={close} size="small" variation="link">
              <IconX />
            </Button>
          </Flex>
          <Divider padding="xs" />
          <View fontSize="large">
            <Type typeData={typeData} />
          </View>
          {displayTypes && <>
            <Divider padding="small" />
            {displayTypes}
          </>}
        </View>
      </Card>
    </View>
  )
}

const DisplayType = ({ data }) => {
  return (
    <Flex direction="column" key={data.name} marginTop="10px">
      <Flex>
        {data.name}: <code>{data.value.type}</code>
      </Flex>
      <Flex>
        {data.description}
      </Flex>
    </Flex>
  )
}
