import useDeviceSize from '@/hooks/use_device_size.hook';
import { CellModel } from '@/models/cell.model';
import { useGameRoomContext } from '@/providers/game_room.provider';
import { useEffect, useState } from 'react';
import { Stage, Layer, Circle, RegularPolygon, Rect, Group } from 'react-konva';
import Cell from '../cell.component';
import { KonvaEventObject } from 'konva/lib/Node';

function Canvas(props: {
  cellsData: Array<CellModel>,
  rows: number,
  cols: number,
  cellSize: number,
  cellGap: number,
  playerColorHex: string
}) {
  const {gameRoom, setGameRoom} = useGameRoomContext();

  function chunkIntoN(arr: Array<CellModel>, n: number): Array<Array<CellModel>> {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  const tableSize = (props.cellSize*props.rows + props.cellGap*(props.rows+1));
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group x={Math.floor(window.innerWidth/2 - tableSize/2)} y={Math.floor(window.innerHeight/2 - tableSize/2)} draggable={(tableSize > window.innerHeight-5 || tableSize > window.innerWidth-5)}>
          {
            chunkIntoN(props.cellsData, props.rows).map(
              (arr, i) => arr.map(
                (cell, j) => (
                  <Cell size={props.cellSize} gap={props.cellGap} data={cell} playerColorHex={props.playerColorHex} />
                )
              )
            )
          }
        </Group>
      </Layer>
    </Stage>
  );
}

export default Canvas;