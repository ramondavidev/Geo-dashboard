"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, CreateUserRequest, UpdateUserRequest } from "@/types";
import { UserManagementProps } from "./UserManagement.types";
import { apiService } from "@/services/apiService";
import { weatherService } from "@/services/weatherService";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ZipCodeDropdown } from "@/components/ZipCodeDropdown";
import { Modal } from "@/components/Modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { WeatherAvatar } from "@/components/WeatherAvatar";
import { TimeZoneClock } from "@/components/TimeZoneClock";
import { ForecastImage } from "@/components/ForecastImage";
import { WeatherOverview } from "@/components/WeatherOverview";
import { getTimeZoneInfo } from "@/components/TimeZoneClock/TimeZoneClock.utils";
import {
  Container,
  MainContent,
  UsersSection,
  MapSection,
  SidebarContent,
  SectionTitle,
  TimeZonesGrid,
  Header,
  Title,
  HeaderButton,
  UserGrid,
  UserCard,
  UserName,
  UserDetail,
  LocationInfo,
  CoordinateText,
  CardActions,
  FormContainer,
  LoadingContainer,
  EmptyState,
  ErrorMessage,
  ButtonWithMargin,
} from "./UserManagement.styles";

export const UserManagement: React.FC<UserManagementProps> = ({
  onUserCountChange,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    zipCode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getTimezoneDisplay = (timezone: string) => {
    try {
      const timeZoneInfo = getTimeZoneInfo(timezone);
      const currentTimeInZone = new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });

      return {
        abbreviation: timeZoneInfo.abbreviation,
        offset: timeZoneInfo.offset,
        currentTime: currentTimeInZone,
      };
    } catch {
      return {
        abbreviation: "UTC",
        offset: "UTC+0",
        currentTime: new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    }
  };

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

  useEffect(() => {
    if (onUserCountChange) {
      onUserCountChange(users.length);
    }
  }, [users.length, onUserCountChange]);

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

      try {
        const weatherData = await weatherService.getWeatherByCoordinates(
          newUser.latitude,
          newUser.longitude
        );
        newUser.weather = weatherData;
      } catch (weatherErr) {
        console.error("Failed to fetch weather for new user:", weatherErr);
      }

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

      if (updateData.zipCode) {
        try {
          const weatherData = await weatherService.getWeatherByCoordinates(
            updatedUser.latitude,
            updatedUser.longitude
          );
          updatedUser.weather = weatherData;
        } catch (weatherErr) {
          console.error(
            "Failed to fetch weather for updated user:",
            weatherErr
          );
          updatedUser.weather = editingUser.weather;
        }
      } else {
        updatedUser.weather = editingUser.weather;
      }

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

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await apiService.deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteUser = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
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

    const temps = weatherUsers.map((user) => user.weather?.temp || 0);
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
        <HeaderButton
          onClick={() => handleOpenModal()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="icon">👤</span>
          Add User
        </HeaderButton>
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
                  onClick={() => handleOpenModal()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="icon">🚀</span>
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
                            <>
                              <UserDetail>
                                🌡️ {Math.round(user.weather.temp)}°F •{" "}
                                {user.weather.description}
                              </UserDetail>
                              <UserDetail>
                                💧 {user.weather.humidity}% • 💨{" "}
                                {Math.round(user.weather.windSpeed)} mph
                              </UserDetail>
                            </>
                          )}
                          {(() => {
                            const timezoneInfo = getTimezoneDisplay(
                              user.timezone
                            );
                            return (
                              <UserDetail>
                                🕐 {timezoneInfo.currentTime} •{" "}
                                {timezoneInfo.abbreviation} (
                                {timezoneInfo.offset})
                              </UserDetail>
                            );
                          })()}
                        </div>
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
                          onClick={() => handleDeleteUser(user)}
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
                      showSeconds={true}
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
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter name"
            disabled={submitting}
          />

          <ZipCodeDropdown
            label="Zip Code"
            value={formData.zipCode}
            onChange={(zipCode) =>
              setFormData((prev) => ({ ...prev, zipCode }))
            }
            placeholder="Search zip code or city..."
            disabled={submitting}
          />

          <div
            style={{
              fontSize: "12px",
              color: "#6B7280",
              marginTop: "4px",
              marginBottom: "1rem",
            }}
          >
            Search by zip code or city name. Select from the dropdown or enter a
            5-digit zip code directly.
          </div>

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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDeleteUser}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={
          userToDelete
            ? `Are you sure you want to delete "${userToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this user? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </Container>
  );
};
