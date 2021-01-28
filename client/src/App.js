import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import './App.css';
import QuestionsScreen from './screens/QuestionsScreen';
import SurveysScreen from './screens/SurveysScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import ReportScreen from './screens/ReportScreen';



function App() {

    return (
        <BrowserRouter>
        <div>
            <header className="header">
            <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap component={ Link } to={"/"} style={{ textDecoration: 'none' }}>
              Online Survey Platform
              </Typography>
            </Toolbar>
          </AppBar>

            </header>
           
            <main className="main">
            <Container>
            <Route path="/survey/:id" component={QuestionsScreen}/>
            <Route path="/qrCode/:id" component={QRCodeScreen}/>
            <Route path="/report/:id" component={ReportScreen}/>
            <Route path="/newSurvey/" component={QuestionsScreen}/>
            <Route path="/" exact={true} component={SurveysScreen} />
            </Container>
            </main>
            <footer className="footer">
            
            </footer>
        </div>
        </BrowserRouter>
    );


}

export default App;
