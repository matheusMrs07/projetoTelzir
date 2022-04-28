import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

import { useParams} from 'react-router-dom';

import { 
  Paper, 
  Button, 
  TextField,
  Grid, 
  Container, 
  Box
} from '@material-ui/core';



import Footer from '../../components/footer-admin';
import MenuAdmin from '../../components/menu-admin';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl:{
    width: '100%'
  },
  button: {
    padding: 15,
  }
  
}));

export default function PricesEdit() {
  const classes = useStyles();


  const {idPrice} = useParams();
  
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');
  const [price, setPrice] = useState('');


  async function handleSubmit(){
    const data = {
      origin: origin,
      destiny: destiny,
      price: price
    };

    
    const response = await api.put('/api/prices/'+idPrice, data);

    if(response.status === 400){
      alert(response.message );
    }else{
      window.location.href='/prices';
    }

  }

  async function getPrice(){
    var response = await api.get('api/prices/'+idPrice);

    setOrigin(response.data.origin);
    setDestiny(response.data.destiny);
    setPrice(response.data.price);
    
  }
 
  useEffect(() => {
    

    getPrice();
  },[getPrice]);

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={"Price"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid className={classes.button} xs={12} sm={12}>
              <Button variant="contained" href="/prices"  color="defauf">
                Back
              </Button>
            </Grid>
            <Grid item sm={12} spacing={3}>
              <Paper className={classes.paper}>
                <h2>Edit Price</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="origin"
                      name="origin"
                      label="Origin"
                      fullWidth
                      value={origin}
                      onChange={e => setOrigin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="destiny"
                      name="destiny"
                      label="destiny"
                      fullWidth
                      value={destiny}
                      onChange={e => setDestiny(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="Price per minute ($)"
                      type="number"
                      inputProps={{step: 0.01}}
                      fullWidth
                      autoComplete="price"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}


