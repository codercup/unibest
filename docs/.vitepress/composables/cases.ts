import { ref, onMounted } from 'vue'
import axios from 'axios'

export type CaseData = {
  name: string
  image: string
  description?: string
}

const data = ref<CaseData[]>([])

export function useCaseData() {
  const data = [
    {
      name: '调剂宝',
      description: '一个专业的调剂助手，帮助你找到最适合自己的调剂方案。',
      image:
        'https://private-user-images.githubusercontent.com/45726436/455309534-d6ae0ca0-9b42-4c01-8024-90f3d9690765.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTAwNDA4MjQsIm5iZiI6MTc1MDA0MDUyNCwicGF0aCI6Ii80NTcyNjQzNi80NTUzMDk1MzQtZDZhZTBjYTAtOWI0Mi00YzAxLTgwMjQtOTBmM2Q5NjkwNzY1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjE2VDAyMjIwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJiMTBjOWIwYmY3OTVmMTBkZmY1ZjM3MjhhZmQ0OTc4NmRkMjllZDM2MzMwMmQyOGYyMTFiNmU3MzE3N2FhMmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.6NIPLDSN3n1LFQTSfynFOIa66DGh3QtIgSkx9zlEf54',
    },
  ]

  return {
    data,
  }
}
