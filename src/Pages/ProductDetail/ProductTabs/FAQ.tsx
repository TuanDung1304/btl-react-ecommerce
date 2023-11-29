import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

const faqs = [
  {
    question: 'Làm thế nào để tôi đặt hàng online?',
    answer: `Biluxury rất vui lòng hỗ trợ khách hàng đặt hàng online bằng một trong những cách đặt hàng sau:
			- Truy cập trang web: https://torano.vn/
			- Liên hệ số hotline: 0383338589 để đặt sản phẩm
			- Chat với tư vấn viên trên fanpage của Biluxury: https://www.facebook.com/tuandung.ptit
		`,
  },
  {
    question: 'Đặt hàng trên web tôi muốn đổi mẫu thì làm thế nào?',
    answer:
      'Dạ chào anh/chị! Anh/chị vui lòng liên hệ trực tiếp CSKH qua https://www.facebook.com/tuandung.ptit hoặc hotline 0383338589 Cảm ơn anh chị đã lựa chọn Biluxury!',
  },
  {
    question: 'Tôi có được xem hàng và thử không?',
    answer:
      'Dạ anh chị có thể xem hàng trước khi thanh toán! Hiện tại Biluxury chưa áp dụng chính sách thử hàng khi mua hàng online! Rất mong anh chị thông cảm!',
  },
  {
    question: 'Tôi muốn đổi màu (size) thì cần làm gì?',
    answer:
      'Dạ anh/chị có thể đổi hàng 1 lần duy nhất trong vòng 7 ngày tại bất kỳ cơ sở của Biluxury hoặc gửi về kho online với điều kiện sản phẩm còn nguyên tem mác gắn liền sản phẩm và hóa đơn áp dụng cho những sản phẩm có mức sale nhỏ hơn 50%.',
  },
  {
    question: 'Tôi mua hàng rồi, không vừa ý có thể đổi lại hay không?',
    answer:
      'Khi mua hàng nếu khách hàng không vừa ý với sản phẩm, hãy cho Biluxury được biết, chúng tôi sẽ đổi ngay sản phẩm cho khách hàng. Chỉ cần đảm bảo sản phẩm chưa qua sử dụng, còn nguyên tem nhãn. Chúng tôi sẽ hỗ trợ đổi (size, màu, sản phẩm khác) cho khách hàng.',
  },
  {
    question: 'Tôi muốn miễn phí ship',
    answer:
      'Dạ hiện tại các đơn hàng nguyên giá trên 500k anh chị được miễn ship! Nếu ở bất kỳ kênh đặt hàng nào anh chị chưa được áp dụng chính sách này, anh chị vui lòng liên hệ trực tiếp hotline 0931733469 để được hỗ trợ!',
  },
]

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  fontWeight: 500,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .02)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(-1)

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : -1)
    }

  return (
    <Box width={800}>
      {faqs.map(({ answer, question }, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}>
          <AccordionSummary>{question}</AccordionSummary>
          <AccordionDetails>
            <Typography>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
