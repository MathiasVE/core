/* eslint-disable @typescript-eslint/dot-notation */
import { join } from 'path';
import { DatabaseError, Sequelize, Transaction } from 'sequelize/types';
import {
  Club,
  ClubMembership,
  DataBaseHandler,
  Event,
  Game,
  logger,
  Player,
  SubEvent
} from '@badvlasim/shared';
import { Mdb } from '../../convert/mdb';
import { CompetitionXmlImporter } from '../importers';
import moment from 'moment';

describe('Club Membership', () => {
  let databaseService: DataBaseHandler;
  let service: CompetitionXmlImporter;
  let transaction: Transaction;

  beforeAll(async () => {
    databaseService = new DataBaseHandler({
      dialect: 'sqlite',
      storage: ':memory:'
    });

    service = new CompetitionXmlImporter(transaction);
  });

  beforeEach(async () => {
    // Clear eveything
    await DataBaseHandler.sequelizeInstance.sync({ force: true });
  });

  it('Add membership to club', async () => {
    // Arrange
    const club1 = await new Club({
      name: 'TestClub1'
    }).save();
    const player1 = await new Player({
      firstName: 'TestPlayer'
    }).save();

    const playerIds = [player1.id];

    service['transaction'] = await DataBaseHandler.sequelizeInstance.transaction();

    // Act
    await service['_addToClubs'](playerIds, moment([2000, 8, 1]), club1.id);
    service['transaction'].commit();

    // Assert
    const memberships = await ClubMembership.findAll();

    expect(memberships.length).toBe(1);
    expect(memberships[0].start).toEqual(moment([2000, 8, 1]).toDate());
    expect(memberships[0].end).toEqual(moment([2001, 8, 1]).toDate());
    expect(memberships[0].playerId).toBe(player1.id);
    expect(memberships[0].clubId).toBe(club1.id);
  });

  it('extend membership to club', async () => {
    // Arrange
    const club1 = await new Club({
      name: 'TestClub1'
    }).save();
    const player1 = await new Player({
      firstName: 'TestPlayer'
    }).save();

    const playerIds = [player1.id];

    service['transaction'] = await DataBaseHandler.sequelizeInstance.transaction();

    // Act
    await service['_addToClubs'](playerIds, moment([2000, 8, 1]), club1.id);
    await service['_addToClubs'](playerIds, moment([2001, 8, 1]), club1.id);
    await service['transaction'].commit();

    // Assert
    const memberships = await ClubMembership.findAll();
    expect(memberships.length).toBe(1);
    expect(memberships[0].start).toEqual(moment([2000, 8, 1]).toDate());
    expect(memberships[0].end).toEqual(moment([2002, 8, 1]).toDate());
    expect(memberships[0].playerId).toBe(player1.id);
    expect(memberships[0].clubId).toBe(club1.id);
  });

  it('Skipping 1 year membership to club', async () => {
    // Arrange
    const club1 = await new Club({
      name: 'TestClub1'
    }).save();
    const player1 = await new Player({
      firstName: 'TestPlayer'
    }).save();

    const playerIds = [player1.id];

    service['transaction'] = await DataBaseHandler.sequelizeInstance.transaction();

    // Act
    await service['_addToClubs'](playerIds, moment([2000, 8, 1]), club1.id);
    await service['_addToClubs'](playerIds, moment([2002, 8, 1]), club1.id);
    await service['transaction'].commit();

    // Assert
    const memberships = await ClubMembership.findAll();
    expect(memberships.length).toBe(2);
    expect(memberships[0].start).toEqual(moment([2000, 8, 1]).toDate());
    expect(memberships[1].start).toEqual(moment([2002, 8, 1]).toDate());
    expect(memberships[1].end).toEqual(moment([2003, 8, 1]).toDate());
    expect(memberships[1].playerId).toBe(player1.id);
    expect(memberships[1].clubId).toBe(club1.id);
  });

  it('switching and going back membership to club', async () => {
    // Arrange
    const club1 = await new Club({
      name: 'TestClub1'
    }).save();
    const club2 = await new Club({
      name: 'TestClub2'
    }).save();
    const player1 = await new Player({
      firstName: 'TestPlayer'
    }).save();

    const playerIds = [player1.id];

    service['transaction'] = await DataBaseHandler.sequelizeInstance.transaction();

    // Act
    await service['_addToClubs'](playerIds, moment([2000, 8, 1]), club1.id);
    await service['_addToClubs'](playerIds, moment([2001, 8, 1]), club2.id);
    await service['_addToClubs'](playerIds, moment([2002, 8, 1]), club1.id);
    await service['transaction'].commit();

    // Assert
    const memberships = await ClubMembership.findAll();
    expect(memberships.length).toBe(3);
    expect(memberships[0].start).toEqual(moment([2000, 8, 1]).toDate());
    expect(memberships[0].clubId).toBe(club1.id);

    expect(memberships[1].start).toEqual(moment([2001, 8, 1]).toDate());
    expect(memberships[1].clubId).toBe(club2.id);

    expect(memberships[2].start).toEqual(moment([2002, 8, 1]).toDate());
    expect(memberships[2].playerId).toBe(player1.id);
    expect(memberships[2].clubId).toBe(club1.id);
  });
});
