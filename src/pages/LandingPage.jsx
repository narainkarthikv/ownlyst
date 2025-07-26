import React from 'react';
import { Box, Typography, Button, Container, Stack, Grid, Card, CardContent, Avatar, Link, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <StickyNote2OutlinedIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Smart Pinning',
    desc: 'Pin important notes to keep them at the top and never lose track of critical tasks.'
  },
  {
    icon: <DashboardOutlinedIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Color Coding',
    desc: 'Organize with priority-based colors: green for low, orange for medium, red for high priority.'
  },
  {
    icon: <TimelineOutlinedIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Advanced Filtering',
    desc: 'Filter by status, date, or title to find exactly what you\'re looking for instantly.'
  },
];

const views = [
  { icon: <StickyNote2OutlinedIcon color="success" />, title: 'Notes View', desc: 'Card-based layout for visual organization' },
  { icon: <DashboardOutlinedIcon color="primary" />, title: 'Boards View', desc: 'Kanban-style boards for workflow management' },
  { icon: <TableChartOutlinedIcon color="info" />, title: 'Tables View', desc: 'Detailed spreadsheet-like data view' },
  { icon: <TimelineOutlinedIcon color="warning" />, title: 'Roadmap View', desc: 'Timeline visualization for project planning' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Sticky Memo has revolutionized how our team manages projects. The color coding and multiple views make everything so much clearer.'
  },
  {
    name: 'Mike Chen',
    role: 'Software Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'The filtering and sorting features save me hours every week. I can find any note or task in seconds.'
  },
  {
    name: 'Emma Davis',
    role: 'Design Lead',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'Beautiful interface and intuitive design. It feels like using real sticky notes but with all the digital advantages.'
  },
];

// Logo Component
const StickyMemoLogo = ({ size = 40, color = "#fff" }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
    <img 
      src="/favicon.svg" 
      alt="Sticky Memo Logo" 
      width={size} 
      height={size}
      style={{ 
        filter: color !== "#fff" ? `brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)` : 'none'
      }}
    />
  </Box>
);

export default function LandingPage() {
  const navigate = useNavigate();

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFF', color: 'text.primary', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        id="hero"
        role="region"
        aria-label="Hero section with app introduction and call to action"
        tabIndex={0}
        sx={{
          width: '100%',
          minHeight: { xs: 420, md: 420 },
          px: 0,
          py: 0,
          background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)',
          color: '#fff',
          borderRadius: 0,
          boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
          borderBottom: '1px solid #e5e8ef',
          position: 'relative',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="lg" sx={{ pt: 7, pb: 4, px: { xs: 3, md: 4 }, minHeight: 420, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', overflow: 'visible' }}>
          {/* Logo and Brand Name */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              cursor: 'pointer',
              '&:hover': { transform: 'scale(1.02)' },
              transition: 'transform 0.2s ease'
            }}
            onClick={() => navigate('/')}
          >
            <StickyMemoLogo size={48} color="#fff" />
            <Typography 
              variant="h4" 
              fontWeight={800} 
              sx={{ 
                ml: 2, 
                fontSize: { xs: 24, md: 28 },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Sticky Memo
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', width: '100%', gap: { xs: 2, md: 4 } }}>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <Typography 
                variant="h1" 
                fontWeight={800} 
                sx={{ 
                  fontSize: { xs: 36, md: 48 }, 
                  lineHeight: 1.1, 
                  mb: 2,
                  textShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
                gutterBottom
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Capture thoughts.<br />Stay organized.
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255,255,255,0.92)', 
                  fontWeight: 400, 
                  fontSize: { xs: 18, md: 22 }, 
                  maxWidth: 520,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform your productivity with the intuitive note-taking app that brings the simplicity of sticky notes to the digital world.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 2 }}
                sx={{ mb: 4 }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  aria-label="Start Taking Notes"
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: 16, 
                    px: 4, 
                    py: 1.8, 
                    borderRadius: 3, 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    bgcolor: 'rgba(255,255,255,0.95)',
                    color: '#6a82fb',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,1)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                  onClick={() => navigate('/notes')}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Taking Notes
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  aria-label="Watch Demo"
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: 16, 
                    px: 4, 
                    py: 1.8, 
                    borderRadius: 3, 
                    borderColor: 'rgba(255,255,255,0.8)', 
                    color: '#fff', 
                    backdropFilter: 'blur(10px)',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { 
                      borderColor: '#fff', 
                      background: 'rgba(255,255,255,0.12)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    } 
                  }}
                  onClick={() => scrollToSection('features')}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Box>
            {/* Demo Cards Illustration */}
            <Box sx={{ 
              flex: 1, 
              display: { xs: 'flex', md: 'flex' }, 
              justifyContent: { xs: 'center', md: 'flex-end' }, 
              alignItems: 'center', 
              minWidth: { xs: '100%', md: 340 }, 
              mt: { xs: 3, md: 0 },
              pr: { xs: 0, md: 2 },
              overflow: 'visible'
            }}>
              <Paper 
                elevation={6} 
                sx={{ 
                  p: 2.5, 
                  borderRadius: 4, 
                  bgcolor: '#fff', 
                  width: { xs: '100%', md: 380 }, 
                  maxWidth: { xs: '100%', md: 380 },
                  minWidth: { xs: 'auto', md: 340 },
                  boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(20px)',
                  overflow: 'hidden'
                }}
                component={motion.div}
                initial={{ opacity: 0, x: 40, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ bgcolor: '#c8e8d1', borderRadius: 2, p: 1.2, mb: 1.2, minHeight: 56, border: '1px solid #b8dfc5' }}>
                      <Typography variant="body2" sx={{ color: '#1e7e34', fontWeight: 700, fontSize: 15 }}>Design Review</Typography>
                      <Typography variant="caption" color="text.secondary">Due: Today</Typography>
                    </Box>
                    <Box sx={{ bgcolor: '#ffe0c8', borderRadius: 2, p: 1.2, minHeight: 56, border: '1px solid #ffd5b8' }}>
                      <Typography variant="body2" sx={{ color: '#d35400', fontWeight: 700, fontSize: 15 }}>Bug Fixes</Typography>
                      <Typography variant="caption" color="text.secondary">Due: Friday</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ bgcolor: '#f5c8c8', borderRadius: 2, p: 1.2, mb: 1.2, minHeight: 56, border: '1px solid #f0b8b8' }}>
                      <Typography variant="body2" sx={{ color: '#a93226', fontWeight: 700, fontSize: 15 }}>Client Meeting</Typography>
                      <Typography variant="caption" color="text.secondary">Due: Tomorrow</Typography>
                    </Box>
                    <Box sx={{ bgcolor: '#c8d8f5', borderRadius: 2, p: 1.2, minHeight: 56, border: '1px solid #b8ccf0' }}>
                      <Typography variant="body2" sx={{ color: '#1f5bc4', fontWeight: 700, fontSize: 15 }}>Team Standup</Typography>
                      <Typography variant="caption" color="text.secondary">Due: Weekly</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        id="features"
        role="region"
        aria-label="Features overview"
        tabIndex={0}
        maxWidth="lg"
        sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 } }}
      >
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
            Powerful Features for Better Organization
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
            Everything you need to manage your tasks and ideas efficiently
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto' }}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card
                component={motion.div}
                whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(80,80,180,0.18)' }}
                transition={{ type: 'spring', stiffness: 200 }}
                elevation={0}
                sx={{ 
                  bgcolor: '#E8EDF5',
                  borderRadius: 4, 
                  p: 4, 
                  minHeight: 220, 
                  alignItems: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
                  border: '1px solid #DDE4EC'
                }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: 20, mb: 1 }} align="center">{feature.title}</Typography>
                <Typography variant="body2" align="center" sx={{ color: '#7A869A', fontSize: 15 }}>{feature.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Views Section */}
      <Box
        id="views"
        role="region"
        aria-label="Views section"
        tabIndex={0}
        sx={{ width: '100%', bgcolor: '#F5F7FA', py: { xs: 8, md: 10 }, borderTop: '1px solid #e5e8ef', borderBottom: '1px solid #e5e8ef' }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 4, md: 6 } }}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
              Multiple Views for Every Workflow
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
              Switch between different views to match your working style
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto' }}>
            {views.map((view) => (
              <Grid item xs={12} sm={6} md={3} key={view.title}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(80,80,180,0.14)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  elevation={0}
                  sx={{ 
                    bgcolor: '#E2E8F0',
                    borderRadius: 4, 
                    p: 3, 
                    minHeight: 120, 
                    alignItems: 'flex-start', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
                    border: '1px solid #D8DFE8'
                  }}
                >
                  <Box mb={1.5} sx={{ fontSize: 32 }}>{view.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 17, mb: 0.5 }} align="left">{view.title}</Typography>
                  <Typography variant="body2" align="left" sx={{ color: '#7A869A', fontSize: 14 }}>{view.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container
        id="testimonials"
        role="region"
        aria-label="User testimonials"
        tabIndex={0}
        maxWidth="lg"
        sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 } }}
      >
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
            Loved by Teams Worldwide
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
            See what our users have to say about Sticky Memo
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto' }}>
          {testimonials.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <Card
                component={motion.div}
                whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(80,80,180,0.10)' }}
                transition={{ type: 'spring', stiffness: 200 }}
                elevation={0}
                sx={{ 
                  bgcolor: '#E8EDF5',
                  borderRadius: 4, 
                  p: 4, 
                  minHeight: 200, 
                  alignItems: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
                  border: '1px solid #DDE4EC'
                }}
              >
                <Avatar src={t.avatar} alt={t.name} sx={{ width: 64, height: 64, mb: 2 }} />
                <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 17 }}>{t.name}</Typography>
                <Typography variant="caption" sx={{ color: '#A0A7B8', mb: 1, fontSize: 14 }}>{t.role}</Typography>
                <Typography variant="body2" align="center" sx={{ color: '#7A869A', fontSize: 15 }}>{t.text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        id="cta"
        role="region"
        aria-label="Call to action"
        tabIndex={0}
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 4, md: 6 },
          background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
          color: '#fff',
          borderTop: '1px solid #e5e8ef',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
            Ready to Transform Your Productivity?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.92)', fontWeight: 400, fontSize: { xs: 16, md: 20 } }}>
            Join thousands of teams already using Sticky Memo to organize their work and boost productivity.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              aria-label="Start Free Trial"
              sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}
              onClick={() => navigate('/notes')}
              component={motion.button}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              aria-label="Open App Now"
              sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, borderColor: '#fff', color: '#fff', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.08)' } }}
              onClick={() => navigate('/notes')}
              component={motion.button}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Open App Now
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, mt: 2, display: 'block' }}>
            No credit card required • 14-day free trial
          </Typography>
        </Container>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: '#151C2B', color: '#fff', py: 5, px: { xs: 4, md: 6 }, borderTop: '1px solid #232B3E', mt: 0 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4 }}>
          <Box sx={{ minWidth: 180, mb: { xs: 3, md: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/favicon.svg" 
                alt="Sticky Memo Logo" 
                width={32} 
                height={32}
              />
              <Typography variant="h6" fontWeight={800} sx={{ color: '#6a82fb', fontSize: 20, ml: 1 }}>
                Sticky Memo
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>
              The ultimate digital sticky note solution for modern teams.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Product</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Features</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Pricing</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Updates</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Company</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>About</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Blog</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Contact</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Support</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Help Center</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Documentation</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Community</Typography>
            </Box>
          </Box>
        </Container>
        <Divider sx={{ bgcolor: '#232B3E', my: 3 }} />
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#A0A7B8', fontSize: 13 }}>
            © 2024 Sticky Memo. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}