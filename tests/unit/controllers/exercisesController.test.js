/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const exercisesController = require('../../../src/controllers/exercisesController');

jest.mock('../../../src/models/Exercise');
const Exercise = require('../../../src/models/Exercise');

describe('exercisesController.findExerciseById', () => {
  it('Should throw an error if given id invalid', async () => {
    const exerciseNotFound = null;
    const invalidExerciseId = null;

    await Exercise.findByPk.mockResolvedValue(exerciseNotFound);

    const fn = async () => {
      await exercisesController.findExerciseById(invalidExerciseId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a exercise if given id valid', async () => {
    const exercise = {
      id: 1,
      name: 'Exercise Test',
    };
    const validExerciseId = 1;

    await Exercise.findByPk.mockResolvedValue(exercise);
    const result = await exercisesController.findExerciseById(validExerciseId);

    expect(result).toEqual(expect.objectContaining({ ...exercise }));
  });
});

describe('exercisesController.getAllExercises', () => {
  it('Should return a empty array of exercises when we dont have exercises', async () => {
    const exercises = [];

    await Exercise.findByPk.mockResolvedValue(exercises);
    const result = await exercisesController.getAllExercises();

    expect(result).toEqual(expect.objectContaining([]));
  });
});

describe('exercisesController.createExercise', () => {
  it('Should return a created exercise', async () => {
    const exercise = {
      id: 1,
      name: 'This is a name',
    };
    await Exercise.findOne.mockResolvedValue(null);
    await Exercise.create.mockResolvedValue(exercise);

    const result = await exercisesController.createExercise(exercise);

    expect(result).toEqual(expect.objectContaining(exercise));
  });
});

describe('exercisesController.editExercise', () => {
  it('Should throw error if given invalid id', async () => {
    const exercise = {
      id: 1,
      name: 'This is a name',
    };
    await Exercise.findByPk.mockResolvedValue(null);

    const fn = async () => {
      await exercisesController.editExercise(exercise);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a edited exercise', async () => {
    const editedExercise = {
      id: 1,
      name: 'This is a edited name',
    };
    await Exercise.findByPk.mockResolvedValue({
      id: 1,
      name: 'This is a name',
      save: async () => Promise.resolve(),
    });

    const result = await exercisesController.editExercise(editedExercise);

    expect(result).toEqual(expect.objectContaining({
      id: 1,
      name: 'This is a edited name',
    }));
  });
});