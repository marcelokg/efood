import * as yup from 'yup'

export const entregaSchema = yup.object().shape({
  quemRecebe: yup.string().required('Campo obrigatório'),
  endereco: yup.string().required('Campo obrigatório'),
  cidade: yup.string().required('Campo obrigatório'),
  cep: yup.string().required('Campo obrigatório'),
  numero: yup.string().required('Campo obrigatório'),
  complemento: yup.string().optional(),
})

export const pagamentoSchema = yup.object().shape({
  nomeNoCartao: yup.string().required('Campo obrigatório'),
  numeroCartao: yup.string().required('Campo obrigatório'),
  cvv: yup.string().required('Campo obrigatório'),
  mesVencimento: yup.number().required('Campo obrigatório'),
  anoVencimento: yup
    .number()
    .required('Campo obrigatório')
    .min(new Date().getFullYear(), 'Ano inválido')
    .max(new Date().getFullYear() + 10, 'Ano inválido'),
})
