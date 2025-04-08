export const getEarningsData = async () => {
    return {
      total: 5421.75,
      monthly: [
        { month: 'Jan', earnings: 700 },
        { month: 'Feb', earnings: 850 },
        { month: 'Mar', earnings: 1200 },
        { month: 'Apr', earnings: 980 },
        { month: 'May', earnings: 1691.75 },
      ],
      weekly: [
        { week: 'Week 1', earnings: 320 },
        { week: 'Week 2', earnings: 450 },
        { week: 'Week 3', earnings: 620 },
        { week: 'Week 4', earnings: 301.75 },
      ],
      daily: [
        { day: 'Mon', earnings: 120 },
        { day: 'Tue', earnings: 180 },
        { day: 'Wed', earnings: 150 },
        { day: 'Thu', earnings: 210 },
        { day: 'Fri', earnings: 300 },
        { day: 'Sat', earnings: 420 },
        { day: 'Sun', earnings: 275 },
      ],
    };
  };
  