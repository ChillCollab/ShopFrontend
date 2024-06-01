// export async function getAuth() {
//   try {
//     const userResponse = await authRequests.userInfo();
//     if (userResponse?.status !== 200 || userResponse.data.role <= 0) {
//       const refreshResponse = await authRequests.refreshToken();
//       if (refreshResponse?.status === 200) {
//         localStorage.setItem('access_token', refreshResponse?.data.access_token);
//         localStorage.setItem('refresh_token', refreshResponse?.data.refresh_token);
//         return await authRequests.userInfo();
//       } else return await authRequests.userInfo();
//     } else {
//       return userResponse;
//     }
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     return false;
//   }
// }
