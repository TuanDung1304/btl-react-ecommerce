import { Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    marginTop: 10,
    '& .MuiGrid-item': {
      display: 'flex',
      alignItems: 'center',
    },
    '& img': {
      width: 30,
      height: 30,
    },
  },
}))

const subInfoItem = [
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc1_img.png?v=202',
    content: 'Miễn phí giao hàng cho đơn hàng từ 500K',
  },
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc2_img.png?v=202',
    content: 'Hàng phân phối chính hãng 100%',
  },
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc3_img.png?v=202',
    content: 'TỔNG ĐÀI 24/7 : 0383338589',
  },
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc1_img.png?v=202',
    content: 'ĐỔI SẢN PHẨM DỄ DÀNG (Trong vòng 7 ngày khi còn nguyên tem mác)',
  },
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc2_img.png?v=202',
    content: 'Kiểm tra, thanh toán khi nhận hàng COD',
  },
  {
    url: 'https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc3_img.png?v=202',
    content: 'Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store Biluxury',
  },
]

export default function ProductSubInfo() {
  const { classes } = useStyles()
  return (
    <Grid container className={classes.root} rowSpacing={3} columnSpacing={3}>
      {subInfoItem.map((item) => (
        <Grid item xs={4}>
          <img src={item.url} alt="" />
          <Typography sx={{ fontSize: 14, paddingX: '10px' }}>
            {item.content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}
