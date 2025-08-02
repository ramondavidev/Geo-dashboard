"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { User, CreateUserRequest, UpdateUserRequest } from "@/types";
import { apiService } from "@/services/apiService";
import { weatherService } from "@/services/weatherService";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/Modal";
import { WeatherAvatar } from "@/components/WeatherAvatar";
import { TimeZoneClock } from "@/components/TimeZoneClock";
import { ForecastImage } from "@/components/ForecastImage";
import { WeatherOverview } from "@/components/WeatherOverview";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 400px;
  }
`;

const UsersSection = styled.div`
  min-width: 0; /* Prevent grid blowout */
`;

const MapSection = styled.div`
  @media (max-width: 1199px) {
    order: -1; /* Show map first on mobile */
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const TimeZonesGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const UserCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const UserName = styled.h3`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const UserDetail = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LocationInfo = styled.div`
  background: ${(props) => props.theme.colors.gray50};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.75rem;
  margin: 1rem 0;
`;

const CoordinateText = styled.span`
  font-family: "Monaco", "Menlo", monospace;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  background: ${(props) => props.theme.colors.gray50};
  color: ${(props) => props.theme.colors.danger};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ButtonWithMargin = styled(Button)`
  margin-top: 1rem;
`;

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    zipCode: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const loadWeatherData = React.useCallback(async () => {
    if (users.length === 0) return;

    try {
      const coordinates = users.map((user) => ({
        lat: user.latitude,
        lng: user.longitude,
        id: user.id,
      }));

      const weatherMap = await weatherService.getWeatherForMultipleLocations(
        coordinates
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          weather: weatherMap.get(user.id) || user.weather,
        }))
      );
    } catch (err) {
      console.error("Failed to load weather data:", err);
    }
  }, [users]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && !users.some((user) => user.weather)) {
      loadWeatherData();
    }
  }, [users, loadWeatherData]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await apiService.getAllUsers();
      setUsers(users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!formData.name.trim() || !formData.zipCode.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const newUser = await apiService.createUser(formData);
      setUsers((prev) => [newUser, ...prev]);
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      setSubmitting(true);
      setError(null);
      const updateData: UpdateUserRequest = {};

      if (formData.name !== editingUser.name) {
        updateData.name = formData.name;
      }
      if (formData.zipCode !== editingUser.zipCode) {
        updateData.zipCode = formData.zipCode;
      }

      if (Object.keys(updateData).length === 0) {
        handleCloseModal();
        return;
      }

      const updatedUser = await apiService.updateUser(
        editingUser.id,
        updateData
      );
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUser.id ? updatedUser : user))
      );
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await apiService.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        zipCode: user.zipCode,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        zipCode: "",
      });
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: "", zipCode: "" });
    setError(null);
    setSubmitting(false);
  };

  const handleSubmit = () => {
    if (editingUser) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  };

  const getWeatherStats = () => {
    const weatherUsers = users.filter((user) => user.weather);
    if (weatherUsers.length === 0) return null;

    const temps = weatherUsers.map(user => user.weather?.temp || 0);
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    
    const conditions = weatherUsers.reduce((acc, user) => {
      const condition = user.weather?.condition || "unknown";
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommon = Object.entries(conditions).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      avgTemp: Math.round(avgTemp),
      totalUsers: weatherUsers.length,
      mostCommonCondition: mostCommon ? mostCommon[0] : "unknown",
      conditionCounts: conditions,
      temperatureRange: {
        min: Math.min(...temps),
        max: Math.max(...temps),
      },
    };
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            🌍
          </motion.div>
          <span style={{ marginLeft: "1rem" }}>Loading users...</span>
        </LoadingContainer>
      </Container>
    );
  }

  const weatherStats = getWeatherStats();

  return (
    <Container>
      <Header>
        <Title>Geo-CRUD Dashboard</Title>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add User
        </Button>
      </Header>

      <MainContent>
        <UsersSection>
          {error && !isModalOpen && (
            <ErrorMessage>
              {error}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </ErrorMessage>
          )}

          {users.length === 0 ? (
            <EmptyState>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>No users found</h3>
                <p>Get started by adding your first user!</p>
                <ButtonWithMargin
                  variant="primary"
                  onClick={() => handleOpenModal()}
                >
                  Add First User
                </ButtonWithMargin>
              </motion.div>
            </EmptyState>
          ) : (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <ForecastImage users={users} height="400px" />
              </div>

              <UserGrid>
                <AnimatePresence>
                  {users.map((user, index) => (
                    <UserCard
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      layout
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <WeatherAvatar
                          userName={user.name}
                          weather={user.weather}
                          size="lg"
                        />
                        <div style={{ flex: 1 }}>
                          <UserName>{user.name}</UserName>
                          <UserDetail>📍 {user.zipCode}</UserDetail>
                          {user.weather && (
                            <UserDetail>
                              🌡️ {Math.round(user.weather.temp)}°F •{" "}
                              {user.weather.description}
                            </UserDetail>
                          )}
                        </div>
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <TimeZoneClock
                          timezone={user.timezone}
                          userName={user.name}
                          size="md"
                          showSeconds={true}
                        />
                      </div>

                      <LocationInfo>
                        <CoordinateText>
                          📍 {user.latitude.toFixed(6)},{" "}
                          {user.longitude.toFixed(6)}
                        </CoordinateText>
                      </LocationInfo>

                      <UserDetail>
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </UserDetail>
                      {user.updatedAt !== user.createdAt && (
                        <UserDetail>
                          Updated:{" "}
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </UserDetail>
                      )}

                      <CardActions>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenModal(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </UserCard>
                  ))}
                </AnimatePresence>
              </UserGrid>
            </>
          )}
        </UsersSection>

        {users.length > 0 && (
          <MapSection>
            <SidebarContent>
              {weatherStats && (
                <WeatherOverview 
                  weatherStats={weatherStats}
                  totalUsers={users.length}
                />
              )}

              <div>
                <SectionTitle>Time Zones</SectionTitle>
                <TimeZonesGrid>
                  {users.slice(0, 6).map((user) => (
                    <TimeZoneClock
                      key={user.id}
                      timezone={user.timezone}
                      userName={user.name}
                      size="sm"
                      showSeconds={false}
                    />
                  ))}
                </TimeZonesGrid>
              </div>
            </SidebarContent>
          </MapSection>
        )}
      </MainContent>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <FormContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter full name"
            disabled={submitting}
          />

          <Input
            label="Zip Code"
            type="text"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
            }
            placeholder="Enter zip code (e.g., 90210)"
            disabled={submitting}
          />

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={
                submitting || !formData.name.trim() || !formData.zipCode.trim()
              }
            >
              {submitting
                ? "Saving..."
                : editingUser
                ? "Update User"
                : "Create User"}
            </Button>
          </div>
        </FormContainer>
      </Modal>
    </Container>
  );
};
