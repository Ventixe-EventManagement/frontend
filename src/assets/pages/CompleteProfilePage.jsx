import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import "./CompleteProfilePage.css";
import CompleteProfileForm from '../components/CompleteProfileForm';


const CompleteProfilePage = () => {
  return <CompleteProfileForm />;
};

export default CompleteProfilePage;