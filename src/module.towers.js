module.exports = {
    run: function towers() {
        _.forEach(Game.rooms, function(room) {
            if (room.controller && room.controller.my && room.controller.level >= 3) {
                    
                let towers = room.find(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_TOWER
                })
                    
                let hostile = room.find(FIND_HOSTILE_CREEPS, {
                    filter: (c) => c.owner.username !== "cplive" && c.owner.username !== "Brun1L"
                })[0]
                
                let injuredCreep = room.find(FIND_MY_CREEPS, {
                        filter: creep => creep.hits < creep.hitsMax * 1
                    })[0]
                    
                if (injuredCreep) {
                    for (let tower of towers) {
                            
                        if (tower.energy > (tower.energyCapacity * .25)) {
                                
                            tower.heal(injuredCreep)
                                
                            room.visual.text("🩺 ", tower.pos.x + 1, tower.pos.y, { align: 'left' })
                        }
                    }
                }
                else {
                    
                    if (hostile) {
                    
                    for (let tower of towers) {
                     
                        tower.attack(hostile)
                        
                        room.visual.text("⚔️ ", tower.pos.x + 1, tower.pos.y, { align: 'left' })
                    }
                }
                else {
                        
                        let logisticStructure = room.find(FIND_STRUCTURES, {
                                filter: (s) =>  (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) & s.hits < s.hitsMax * 0.5
                        })[0]
                        
                        if (logisticStructure) {
                            for (let tower of towers) {
                                
                                if (tower.energy > (tower.energyCapacity * .7)) {
                                    
                                    tower.repair(logisticStructure)
                                    
                                    room.visual.text("🔧 ", tower.pos.x + 1, tower.pos.y, { align: 'left' })
                                }
                            }
                        }
                        else {
                            
                            let lowRampart = room.find(FIND_MY_STRUCTURES, {
                                filter: s => s.structureType == STRUCTURE_RAMPART && s.hits <= 1000
                            })[0]
                            
                            if (lowRampart) {
                                for (let tower of towers) {
                                    
                                    if (tower.energy > (tower.energyCapacity * .6)) {
                                        
                                        tower.repair(lowRampart)
                                        
                                        room.visual.text("🔧 ", tower.pos.x + 1, tower.pos.y, { align: 'left' })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
};