export default function convertToCacheFormat(result){
    return { ROOT_QUERY: { __typename: 'Query', ...result } }
}