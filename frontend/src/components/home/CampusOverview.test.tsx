import { render, screen, waitFor } from '@testing-library/react'
import { CampusOverview } from './CampusOverview'
import { buildingService } from '@/modules/buildings/services/building.service'

jest.mock('@/modules/buildings/services/building.service')

describe('CampusOverview', () => {
  const mockBuildings = [
    {
      id: '1',
      name: 'Engineering Building',
      description: 'Main engineering complex',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Science Building',
      description: 'Science labs and classrooms',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state initially', () => {
    ;(buildingService.getAll as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    )

    render(<CampusOverview />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('should render buildings after loading', async () => {
    ;(buildingService.getAll as jest.Mock).mockResolvedValue(mockBuildings)

    render(<CampusOverview />)

    await waitFor(() => {
      expect(screen.getByText('Engineering Building')).toBeInTheDocument()
      expect(screen.getByText('Science Building')).toBeInTheDocument()
    })
  })

  it('should display campus overview title', async () => {
    ;(buildingService.getAll as jest.Mock).mockResolvedValue(mockBuildings)

    render(<CampusOverview />)

    await waitFor(() => {
      expect(screen.getByText('Campus Overview')).toBeInTheDocument()
    })
  })

  it('should show summary statistics', async () => {
    ;(buildingService.getAll as jest.Mock).mockResolvedValue(mockBuildings)

    render(<CampusOverview />)

    await waitFor(() => {
      expect(screen.getByText('Total Buildings')).toBeInTheDocument()
      expect(screen.getByText('Total Rooms')).toBeInTheDocument()
    })
  })
})
