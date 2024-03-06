import React, { useEffect, useState } from 'react'
import '../../../styles.css'
import './AccountMenu.css'
import { Tooltip } from '@mui/joy'
import { useClient } from '../../../providers/ClientProvider/ClientProvider'
import IconButton from '@mui/material/IconButton'
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import { useNavigate } from 'react-router-dom'

type AccountMenuProps = {
  onLogout: () => void
}
const AccountMenu: React.FunctionComponent<AccountMenuProps> = ({
  onLogout,
}) => {
  const client = useClient()
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleGoToMyAccount = () => {
    navigate('/my-account')
  }

  useEffect(() => {
    async function fetchData() {
      if (!client) return
      const id: number = Number(localStorage.getItem('user_id'))
      const { user, error } = await client?.findUser(id)
      if (error) console.log(error)
      if (user !== null) setFirstname(user.firstname)
    }
    fetchData()
  }, [client])

  return (
    <>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {firstname.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGoToMyAccount}>
          <Avatar /> My account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CodeIcon fontSize={'small'} />
          </ListItemIcon>
          My scenarios
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
