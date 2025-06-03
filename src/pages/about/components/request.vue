import useRequest from '@/hooks/useRequest' import { getFooAPI, postFooAPI, IFooItem } from
'@/service/index/foo' import { ref } from 'vue' // import { findPetsByStatusQueryOptions } from
'@/service/app' // import { useQuery } from '@tanstack/vue-query' const recommendUrl =
ref('http://laf.run/signup?code=ohaOgIX') // const initialData = { // name: 'initialData', // id:
'1234', // } const initialData = undefined //
适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层 const { loading, error,
data, run } = useRequest
<IFooItem></IFooItem>
