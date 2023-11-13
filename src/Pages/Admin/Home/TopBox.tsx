import { topDealUsers } from '../../../data'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  text: {
    marginBottom: '20px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  user: {
    display: 'flex',
    gap: '20px',
  },
  img: {
    width: '40px',
    height: '40px',
    borderRadius: ' 50%',
    objectFit: 'cover',
  },
  userTexts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  username: {
    fontSize: '14px',
    fontWeight: '500',
  },
  email: {
    fontSize: '12px',
  },
  amount: {
    fontWeight: 500,
  },
}))

const TopBox = () => {
  const { classes } = useStyles()
  return (
    <div>
      <h1 className={classes.text}>Top Deals</h1>
      <div>
        {topDealUsers.map((user) => (
          <div className={classes.listItem} key={user.id}>
            <div className={classes.user}>
              <img src={user.img} alt="" className={classes.img} />
              <div className={classes.userTexts}>
                <span className={classes.username}>{user.username}</span>
                <span className={classes.email}>{user.email}</span>
              </div>
            </div>
            <span className={classes.amount}>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox
