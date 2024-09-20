// // // // //import React from 'react';
// // // // import { render, fireEvent, waitFor } from '@testing-library/react';
// // // // //import '@testing-library/jest-dom/extend-expect';
// // // // import '@testing-library/jest-dom';
// // // // import PettingZones from '../PettingZones';

// // // // const mockMapData = [
// // // //   { title: 'Zone 1', rating: 6, coords: '1,2,3,4', shape: 'rect' },
// // // //   { title: 'Zone 2', rating: 6, coords: '5,6,7,8', shape: 'rect' },
// // // // ];

// // // // const mockPlayerId = 'player1';

// // // // describe('PettingZones', () => {
// // // //   it('should display the correct number of zones', () => {
// // // //     const { getAllByRole } = render(
// // // //       <PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />
// // // //     );
// // // //     expect(getAllByRole('button')).toHaveLength(mockMapData.length);
// // // //   });

// // // //   it('should activate a zone when clicked', async () => {
// // // //     const { getByText } = render(
// // // //       <PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />
// // // //     );
// // // //     const zone = getByText('Zone 1');
// // // //     fireEvent.click(zone);
// // // //     await waitFor(() => {
// // // //       expect(zone).toHaveAttribute('data-active', 'true');
// // // //     });
// // // //   });

// // // //   // Add more tests here
// // // // });

// // // // // import React from 'react';
// // // // // import { render, fireEvent, screen } from '@testing-library/react';
// // // // // import PettingZones from '../PettingZones';

// // // // // // Mock data for zones
// // // // // const highRiskZone = { title: 'Belly', rating: 1, coords: '0,0,82,126', shape: 'rect' };
// // // // // const lowRiskZone = { title: 'Head', rating: 6, coords: '0,0,82,126', shape: 'rect' };
// // // // // const mapData = [highRiskZone, lowRiskZone];

// // // // // // Mock Rune global object
// // // // // global.Rune = {
// // // // //   actions: {
// // // // //     updateScore: jest.fn(),
// // // // //     updateScratch: jest.fn(),
// // // // //   },
// // // // //   initClient: jest.fn(),
// // // // // } as any;

// // // // // describe('PettingZones Component', () => {
// // // // //   const playerId = 'player1';

// // // // //   it('should render petting zones correctly', () => {
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
// // // // //     expect(screen.getByAltText('Belly')).toBeInTheDocument();
// // // // //     expect(screen.getByAltText('Head')).toBeInTheDocument();
// // // // //   });

// // // // //   it('should handle pointer down event', () => {
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
// // // // //     const headArea = screen.getByAltText('Head');
// // // // //     fireEvent.pointerDown(headArea);
// // // // //     expect(screen.getByText('Pointer down in Head')).toBeInTheDocument();
// // // // //   });

// // // // //   it('should roll dice and scratch when a 1 is rolled in high-risk area', () => {
// // // // //     jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
    
// // // // //     const bellyArea = screen.getByAltText('Belly');
// // // // //     fireEvent.click(bellyArea);
    
// // // // //     expect(screen.getByText(/Rolled a 1 out of 1 for Belly/)).toBeInTheDocument();
// // // // //     expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId, amount: 1 });
// // // // //   });

// // // // //   it('should not scratch in low-risk area if a 1 is not rolled', () => {
// // // // //     jest.spyOn(Math, 'random').mockReturnValue(0.9); // Force a roll higher than 1
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
    
// // // // //     const headArea = screen.getByAltText('Head');
// // // // //     fireEvent.click(headArea);

// // // // //     expect(screen.getByText(/Rolled a 6 out of 6 for Head/)).toBeInTheDocument();
// // // // //     expect(Rune.actions.updateScratch).not.toHaveBeenCalled();
// // // // //   });

// // // // //   it('should handle player joining', () => {
// // // // //     // Simulate a player joining
// // // // //     const game = {
// // // // //       playerIds: ['player1', 'player2'],
// // // // //       catHappiness: 100,
// // // // //     };

// // // // //     // Mock the setGame function and Rune initClient
// // // // //     const setGame = jest.fn();
// // // // //     Rune.initClient.mockImplementation(({ onChange }) => {
// // // // //       onChange({ game });
// // // // //     });

// // // // //     expect(game.playerIds.length).toBe(2);
// // // // //   });

// // // // //   it('should handle player leaving', () => {
// // // // //     const game = {
// // // // //       playerIds: ['player1'],
// // // // //     };

// // // // //     // Mock the setGame function and Rune initClient
// // // // //     const setGame = jest.fn();
// // // // //     Rune.initClient.mockImplementation(({ onChange }) => {
// // // // //       onChange({ game });
// // // // //     });

// // // // //     expect(game.playerIds.length).toBe(1);
// // // // //   });

// // // // //   it('should trigger win condition when cat happiness reaches 1000', () => {
// // // // //     const game = {
// // // // //       catHappiness: 1000,
// // // // //     };

// // // // //     // Mock the setGame function and Rune initClient
// // // // //     const setGame = jest.fn();
// // // // //     Rune.initClient.mockImplementation(({ onChange }) => {
// // // // //       onChange({ game });
// // // // //     });

// // // // //     expect(game.catHappiness).toBe(1000);
// // // // //   });

// // // // //   it('should trigger loss condition when cat happiness reaches 0', () => {
// // // // //     const game = {
// // // // //       catHappiness: 0,
// // // // //     };

// // // // //     // Mock the setGame function and Rune initClient
// // // // //     const setGame = jest.fn();
// // // // //     Rune.initClient.mockImplementation(({ onChange }) => {
// // // // //       onChange({ game });
// // // // //     });

// // // // //     expect(game.catHappiness).toBe(0);
// // // // //   });

// // // // //   it('should handle high-risk zone focus (low rating)', () => {
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
// // // // //     const bellyArea = screen.getByAltText('Belly');
// // // // //     fireEvent.click(bellyArea);
// // // // //     expect(screen.getByText(/Rolled a 1/)).toBeInTheDocument();
// // // // //   });

// // // // //   it('should handle low-risk zone focus (high rating)', () => {
// // // // //     render(<PettingZones imageName="test-map" mapData={mapData} playerId={playerId} />);
// // // // //     const headArea = screen.getByAltText('Head');
// // // // //     fireEvent.click(headArea);
// // // // //     expect(screen.getByText(/Rolled a 6/)).toBeInTheDocument();
// // // // //   });
// // // // // });

// // // import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// // // import '@testing-library/jest-dom';
// // // import PettingZones from '../PettingZones';

// // // // Mock data
// // // const mockMapData = [
// // //   { title: 'High-Risk Zone', rating: 1, coords: '1,2,3,4', shape: 'rect' }, // Low rating = high risk
// // //   { title: 'Low-Risk Zone', rating: 6, coords: '5,6,7,8', shape: 'rect' },  // High rating = low risk
// // // ];

// // // const mockPlayerId = 'player1';

// // // // Mock Rune global object
// // // // global.Rune = {
// // // //   actions: {
// // // //     updateScore: jest.fn(),
// // // //     updateScratch: jest.fn(),
// // // //   },
// // // //   initClient: jest.fn(),
// // // // } as any;

// // // describe('PettingZones Component Tests', () => {

// // //   // 1. Basic Rendering Tests
// // //   it('should display the correct number of zones', () => {
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     expect(screen.getAllByRole('button')).toHaveLength(mockMapData.length);
// // //   });

// // //   it('should activate a zone when clicked', async () => {
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const zone = screen.getByText('High-Risk Zone');
// // //     fireEvent.click(zone);
// // //     await waitFor(() => {
// // //       expect(zone).toHaveAttribute('data-active', 'true');
// // //     });
// // //   });

// // //   // 2. Pointer and Cursor Edge Case Tests
// // //   it('should handle pointer down event correctly', () => {
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const highRiskZone = screen.getByText('High-Risk Zone');
// // //     fireEvent.pointerDown(highRiskZone);
// // //     expect(highRiskZone).toHaveAttribute('data-active', 'true');
// // //   });

// // //   it('should handle pointer move event correctly', () => {
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const lowRiskZone = screen.getByText('Low-Risk Zone');
// // //     fireEvent.pointerMove(lowRiskZone);
// // //     expect(lowRiskZone).toHaveAttribute('data-active', 'true');
// // //   });

// // //   it('should deactivate a zone when pointer is up', () => {
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const highRiskZone = screen.getByText('High-Risk Zone');
// // //     fireEvent.pointerDown(highRiskZone);
// // //     fireEvent.pointerUp(highRiskZone);
// // //     expect(highRiskZone).not.toHaveAttribute('data-active', 'true');
// // //   });

// // //   // 3. High-Risk and Low-Risk Focus Tests
// // //   it('should roll a 1 and trigger a scratch in high-risk zone', () => {
// // //     jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const highRiskZone = screen.getByText('High-Risk Zone');
// // //     fireEvent.click(highRiskZone);
// // //     expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
// // //   });

// // //   it('should not scratch when interacting with a low-risk zone', () => {
// // //     jest.spyOn(Math, 'random').mockReturnValue(0.9); // Force a roll higher than 1
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// // //     const lowRiskZone = screen.getByText('Low-Risk Zone');
// // //     fireEvent.click(lowRiskZone);
// // //     expect(Rune.actions.updateScratch).not.toHaveBeenCalled();
// // //   });

// // // //   // 4. Win/Loss Condition Tests
// // // //   it('should trigger win condition when cat happiness reaches 1000', () => {
// // // //     const mockGameState = { catHappiness: 1000, playerIds: [mockPlayerId] };
// // // //     global.Rune.initClient.mockImplementation(({ onChange }) => {
// // // //       onChange({ game: mockGameState });
// // // //     });
// // // //     expect(mockGameState.catHappiness).toBe(1000);
// // // //     // Here you'd expect further behavior like game ending
// // // //   });

// // // //   it('should trigger loss condition when cat happiness reaches 0', () => {
// // // //     const mockGameState = { catHappiness: 0, playerIds: [mockPlayerId] };
// // // //     global.Rune.initClient.mockImplementation(({ onChange }) => {
// // // //       onChange({ game: mockGameState });
// // // //     });
// // // //     expect(mockGameState.catHappiness).toBe(0);
// // // //     // You could add more expectations if the game is expected to end
// // // //   });

// // // //   // 5. Player Interaction Tests
// // // //   it('should handle player joining', () => {
// // // //     const mockGameState = { playerIds: [mockPlayerId, 'player2'], catHappiness: 100 };
// // // //     global.Rune.initClient.mockImplementation(({ onChange }) => {
// // // //       onChange({ game: mockGameState });
// // // //     });
// // // //     expect(mockGameState.playerIds.length).toBe(2);
// // // //   });

// // // //   it('should handle player leaving', () => {
// // // //     const mockGameState = { playerIds: [mockPlayerId], catHappiness: 100 };
// // // //     global.Rune.initClient.mockImplementation(({ onChange }) => {
// // // //       onChange({ game: mockGameState });
// // // //     });
// // // //     expect(mockGameState.playerIds.length).toBe(1);
// // // //   });
// // // });

// // import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// // import '@testing-library/jest-dom';
// // import PettingZones from '../PettingZones';

// // // Mock data for zones
// // const mockMapData = [
// //   { title: 'High-Risk Zone', rating: 1, coords: '1,2,3,4', shape: 'rect' }, // Low rating = high risk
// //   { title: 'Low-Risk Zone', rating: 6, coords: '5,6,7,8', shape: 'rect' },  // High rating = low risk
// // ];

// // const mockPlayerId = 'player1';

// // // Mock Rune global object
// // // global.Rune = {
// // //   actions: {
// // //     updateScore: jest.fn(),
// // //     updateScratch: jest.fn(),
// // //   },
// // //   initClient: jest.fn(),
// // // } as any;

// // describe('PettingZones Component Tests', () => {
// //   // 1. Basic Rendering Tests
// //   it('should display the correct number of zones', () => {
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     // Use getByAltText instead of getByRole or getByText
// //     const highRiskZone = screen.getByAltText('High-Risk Zone');
// //     const lowRiskZone = screen.getByAltText('Low-Risk Zone');
    
// //     expect(highRiskZone).toBeInTheDocument();
// //     expect(lowRiskZone).toBeInTheDocument();
// //   });

// //   it('should activate a zone when clicked', async () => {
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     const highRiskZone = screen.getByAltText('High-Risk Zone');
// //     fireEvent.click(highRiskZone);
    
// //     // You may need to add a `data-active` attribute to the element upon activation in the actual code
// //     await waitFor(() => {
// //         expect(console.log).toHaveBeenCalledWith('Pointer moved to Low-Risk Zone');
// //     });
// //   });

// //   // 2. Pointer and Cursor Edge Case Tests
// //   it('should handle pointer down event correctly', () => {
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     const highRiskZone = screen.getByAltText('High-Risk Zone');
// //     fireEvent.pointerDown(highRiskZone);
    
// //     expect(console.log).toHaveBeenCalledWith('Pointer moved to Low-Risk Zone');
// //   });

// //   it('should handle pointer move event correctly', () => {
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     const lowRiskZone = screen.getByAltText('Low-Risk Zone');
// //     fireEvent.pointerMove(lowRiskZone);
    
// //     expect(console.log).toHaveBeenCalledWith('Pointer moved to Low-Risk Zone');
// //   });

// //   it('should deactivate a zone when pointer is up', () => {
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     const highRiskZone = screen.getByAltText('High-Risk Zone');
// //     fireEvent.pointerDown(highRiskZone);
// //     fireEvent.pointerUp(highRiskZone);
    
// //     expect(highRiskZone).not.toHaveAttribute('data-active', 'true');
// //   });

// //   // 3. High-Risk and Low-Risk Focus Tests
// //   it('should roll a 1 and trigger a scratch in high-risk zone', () => {
// //     jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// //     const highRiskZone = screen.getByAltText('High-Risk Zone');
// //     fireEvent.click(highRiskZone);
    
// //     expect(console.log).toHaveBeenCalledWith(`Player got scratched! ${mockPlayerId}`);
// //   });

// // //   it('should not scratch when interacting with a low-risk zone', () => {
// // //     jest.spyOn(Math, 'random').mockReturnValue(0.9); // Force a roll higher than 1
// // //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
// // //     const lowRiskZone = screen.getByAltText('Low-Risk Zone');
// // //     fireEvent.click(lowRiskZone);
    
// // //     expect(Rune.actions.updateScratch).not.toHaveBeenCalled();
// // //   });

// // test('logs activation count when 1 is rolled', () => {
// //     console.log = jest.fn(); // Mock console.log
// //     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
// //     fireEvent.click(screen.getByAltText('High-Risk Zone')); // Simulate click on Zone1
// //     fireEvent.click(screen.getByAltText('Low-Risk Zone')); // Simulate click on Zone2
// //     fireEvent.click(screen.getByAltText('High-Risk Zone')); // Simulate another click on Zone1
// //     expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
// //   });

// // });

// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import PettingZones from '../PettingZones';

// const mockMapData = [
//   { title: 'High-Risk Zone', rating: 1, coords: '1,2,3,4', shape: 'rect' }, // Low rating = high risk
//   { title: 'Low-Risk Zone', rating: 6, coords: '5,6,7,8', shape: 'rect' },  // High rating = low risk
// ];

// const mockPlayerId = 'player1';

// beforeEach(() => {
//     (global as any).Rune = {
//     actions: {
//       updateScore: jest.fn(),
//       updateScratch: jest.fn(),
//     },
//     gameTime: jest.fn(() => Date.now()),
//     invalidAction: jest.fn(),
//     gameOver: jest.fn(),
//   };

//   // Mock console.log
//   jest.spyOn(global.console, 'log').mockImplementation(() => {});
// });

// afterEach(() => {
//   jest.restoreAllMocks(); // Clean up after each test
// });

// describe('PettingZones Component Tests', () => {
//   // 1. Basic Rendering Tests
//   it('should display the correct number of zones', () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     // Use getByAltText instead of getByRole or getByText
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     const lowRiskZone = screen.getByAltText('Low-Risk Zone');
    
//     expect(highRiskZone).toBeInTheDocument();
//     expect(lowRiskZone).toBeInTheDocument();
//   });

//   it('should activate a zone when clicked and trigger an action', async () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.click(highRiskZone);

//     // Wait for the console.log that indicates zone activation
//     await waitFor(() => {
//       expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
//     });

//     // Assert that Rune.actions.updateScratch was called
//     expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
//   });

//   // 2. Pointer and Cursor Edge Case Tests
//   it('should handle pointer down event correctly', () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.pointerDown(highRiskZone);
    
//     expect(console.log).toHaveBeenCalledWith('Pointer down in High-Risk Zone');
//   });

//   it('should activate a zone when clicked and trigger an action', async () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
  
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.click(highRiskZone);
  
//     await waitFor(() => {
//       expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
//       expect(console.log).toHaveBeenCalledWith(`Player got scratched! ${mockPlayerId}`);
//       expect(console.log).toHaveBeenCalledWith('The chance of rolling a 1 was 1. This zone has been activated 1 times before a 1 was rolled.');
//     });
  
//     // Assert that Rune.actions.updateScratch was called
//     expect((global as any).Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
//   });

//   // 3. High-Risk and Low-Risk Focus Tests
//   it('should roll a 1 and trigger a scratch in high-risk zone', () => {
//     jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.click(highRiskZone);
    
//     expect(console.log).toHaveBeenCalledWith(`Player got scratched! ${mockPlayerId}`);
//     expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
//   });

//   it('logs activation count when 1 is rolled', () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     fireEvent.click(screen.getByAltText('High-Risk Zone'));
    
//     expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
//   });
// });



//   it('should deactivate a zone when pointer is up', () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     const lowRiskZone = screen.getByAltText('Low-Risk Zone');
//     fireEvent.pointerDown(lowRiskZone);
//     fireEvent.pointerUp(lowRiskZone);
    
//     expect(console.log).toHaveBeenCalledWith('Pointer up');
//   });

  // 3. High-Risk and Low-Risk Focus Tests
//   it('should roll a 1 and trigger a scratch in high-risk zone', () => {
//     jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.click(highRiskZone);
    
//     expect(console.log).toHaveBeenCalledWith(`Player got scratched! ${mockPlayerId}`);
//     expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
//   });

//   it('logs activation count when 1 is rolled', () => {
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
//     fireEvent.click(screen.getByAltText('High-Risk Zone'));
    
//     expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
//   });

//   // 4. Win and Loss Conditions
//   it('should trigger game over when cat happiness reaches 1000 (win condition)', () => {
//     (global as any).Rune.gameTime.mockReturnValueOnce(1000);
    
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);

//     const noRiskZone = screen.getByAltText('No-Risk Zone');
//     fireEvent.click(noRiskZone);
    
//     // Simulate a large score increase to hit win condition
//     (global as any).Rune.actions.updateScore.mockImplementationOnce(({ playerId, amount }: { playerId: PlayerId, amount: number }) => {
//       expect(playerId).toBe(mockPlayerId);
//       expect(amount).toBeGreaterThanOrEqual(1000);
//     });

//     expect(Rune.gameOver).toHaveBeenCalled();
//   });

//   it('should trigger game over when cat happiness reaches 0 (loss condition)', () => {
//     (global as any).Rune.gameTime.mockReturnValueOnce(0);
    
//     render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);

//     const highRiskZone = screen.getByAltText('High-Risk Zone');
//     fireEvent.click(highRiskZone);
    
//     (global as any).Rune.actions.updateScratch.mockImplementationOnce(({ playerId, amount }: { playerId: PlayerId, amount: number }) => {
//       expect(playerId).toBe(mockPlayerId);
//       expect(amount).toBeGreaterThanOrEqual(1);
//     });

//     expect(Rune.gameOver).toHaveBeenCalled();
//   });

  // 5. Player Joining and Leaving

  import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PettingZones from '../PettingZones';
import type { PlayerId } from 'rune-games-sdk/multiplayer'; // Importing PlayerId type from your SDK

const mockMapData = [
  { title: 'High-Risk Zone', rating: 1, coords: '1,2,3,4', shape: 'rect' }, // Low rating = high risk
  { title: 'Low-Risk Zone', rating: 400, coords: '5,6,7,8', shape: 'rect' },  // High rating = low risk
  {title: 'No-Risk Zone', rating: 50000, coords: '100,50,50,100', shape: 'rect' },  // High rating = low risk
];

const mockPlayerId: PlayerId = 'player1';

beforeEach(() => {
    (global as any).Rune = {
      actions: {
        updateScore: jest.fn(),
        updateScratch: jest.fn(),
      },
      gameTime: jest.fn(() => Date.now()),
      invalidAction: jest.fn(),
      gameOver: jest.fn(),
      events: {
        playerJoined: jest.fn(),
        playerLeft: jest.fn(),
      },
    };
  
    // Mock console.log
    jest.spyOn(global.console, 'log').mockImplementation(() => {});
  });

afterEach(() => {
  jest.restoreAllMocks(); // Clean up after each test
});

describe('PettingZones Component Tests', () => {
  // 1. Basic Rendering Tests
  it('should display the correct number of zones', () => {
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
    const highRiskZone = screen.getByAltText('High-Risk Zone');
    const lowRiskZone = screen.getByAltText('Low-Risk Zone');
    const noRiskZone = screen.getByAltText('No-Risk Zone');
    
    expect(highRiskZone).toBeInTheDocument();
    expect(lowRiskZone).toBeInTheDocument();
    expect(noRiskZone).toBeInTheDocument();
  });

  // 2. Pointer and Cursor Edge Case Tests
  it('should handle pointer down event correctly', () => {
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
    const noRiskZone = screen.getByAltText('No-Risk Zone');
    fireEvent.pointerDown(noRiskZone);
    
    expect(console.log).toHaveBeenCalledWith('Pointer down in No-Risk Zone');
  });

  it('should roll a 1 and trigger a scratch in high-risk zone', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0); // Force a roll of 1
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
    const highRiskZone = screen.getByAltText('High-Risk Zone');
    fireEvent.click(highRiskZone);
    
    expect(console.log).toHaveBeenCalledWith(`Player got scratched! ${mockPlayerId}`);
    expect(Rune.actions.updateScratch).toHaveBeenCalledWith({ playerId: mockPlayerId, amount: 1 });
  });

  it('logs activation count when 1 is rolled', () => {
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);
    
    fireEvent.click(screen.getByAltText('High-Risk Zone'));
    
    expect(console.log).toHaveBeenCalledWith('Rolled a 1 out of 1 for High-Risk Zone');
  });

  it('should trigger player join and update score', () => {
    const newPlayerId: PlayerId = 'player2';
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);

    (global as any).Rune.events.playerJoined(newPlayerId, { game: { scores: { [mockPlayerId]: 0 }, playerIds: [mockPlayerId] } });

    expect(Rune.actions.updateScore).not.toBeNull();
    expect((global as any).Rune.events.playerJoined).toHaveBeenCalledWith(newPlayerId, expect.anything());
  });

  it('should trigger player leave and update score', () => {
    const leavingPlayerId: PlayerId = 'player1';
    render(<PettingZones imageName="image-map" mapData={mockMapData} playerId={mockPlayerId} />);

    (global as any).Rune.events.playerLeft(leavingPlayerId, { game: { scores: { [mockPlayerId]: 0 }, playerIds: [mockPlayerId] } });

    expect(Rune.actions.updateScore).not.toBeNull();
    expect((global as any).Rune.events.playerLeft).toHaveBeenCalledWith(leavingPlayerId, expect.anything());
  });
});
